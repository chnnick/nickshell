// Spotify's /me/top/* endpoints read the owner's own listening history, so they
// need a refresh token that can't ship to the browser. Both lists are therefore
// baked in at build time by scripts/fetch-spotify.mjs — see ./spotify.generated.
import { spotifyTop } from './spotify.generated';

export interface TopTrack {
  name: string;
  /** Joined artist names; Spotify returns an array for collaborations. */
  artist: string;
  url: string;
}

export interface TopArtist {
  name: string;
  url: string;
}

/** Top 3 over roughly the last 4 weeks, most-played first. */
export const topTracks: TopTrack[] = spotifyTop.tracks;
export const topArtists: TopArtist[] = spotifyTop.artists;
