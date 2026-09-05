// One-time helper that mints the refresh token scripts/fetch-spotify.mjs needs.
//
// Run it once, locally — never in CI:
//
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
//
// It prints an authorize URL, catches the redirect on 127.0.0.1:8888, and trades
// the resulting one-time code for a refresh token. Store that token as the
// SPOTIFY_REFRESH_TOKEN repository secret; it stays valid until revoked.

import { createServer } from 'node:http';

const PORT = 8888;
// Spotify rejects `localhost` in redirect URIs — the loopback IP must be literal.
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPE = 'user-top-read';

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;

if (!id || !secret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.');
  process.exit(1);
}

const authorizeUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    client_id: id,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPE,
    // Always show consent, so re-running this reliably issues a fresh token.
    show_dialog: 'true',
  });

/** Trade the one-time ?code= for the long-lived refresh token. */
async function exchange(code) {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  return res.json();
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');

  if (error || !code) {
    res.writeHead(400, { 'content-type': 'text/plain' }).end(error ?? 'no code returned');
    console.error(`\nAuthorization failed: ${error ?? 'no code returned'}`);
    process.exitCode = 1;
    server.close();
    return;
  }

  try {
    const { refresh_token: refreshToken } = await exchange(code);
    res.writeHead(200, { 'content-type': 'text/plain' }).end('Done — back to your terminal.');
    console.log('\nSPOTIFY_REFRESH_TOKEN:\n');
    console.log(refreshToken);
    console.log('\nAdd it as a repository secret, then run scripts/fetch-spotify.mjs.');
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' }).end('Exchange failed.');
    console.error(`\n${err.message}`);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Make sure this redirect URI is registered on your Spotify app:\n  ${REDIRECT_URI}\n`);
  console.log(`Then open:\n  ${authorizeUrl}\n`);
  console.log('Waiting for the redirect...');
});
