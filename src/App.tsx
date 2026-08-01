import { lazy, Suspense } from 'react';
import { Home } from './pages/Home';
import { resumeUrl } from './content';

// The terminal, its command processor and its virtual filesystem are a separate
// chunk — none of it is downloaded by visitors who only ever see the homepage.
const Shell = lazy(() =>
  import('./components/terminal/Shell').then((m) => ({ default: m.Shell })),
);

function App() {
  // Three routes doesn't justify a router. Deep links arrive here via the
  // public/404.html -> `?p=` redirect that main.tsx unwraps.
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/resume') {
    return (
      <div className="flex h-screen flex-col p-3">
        <a href="/" className="mb-2 text-[13px] text-muted">
          ← back
        </a>
        <iframe
          src={resumeUrl}
          className="min-h-0 w-full flex-1 rounded border border-rule"
          title="Nick Chen Resume PDF"
        />
      </div>
    );
  }

  if (path === '/terminal') {
    return (
      <div className="theme-terminal min-h-screen bg-bg font-mono">
        <Suspense
          fallback={<div className="p-3 text-sm text-muted">loading shell…</div>}
        >
          <Shell />
        </Suspense>
      </div>
    );
  }

  return <Home />;
}

export default App;
