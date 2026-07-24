import { Shell } from './components/Shell';
import { resumeUrl } from './content';

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/resume') {
    return (
      <div className="min-h-screen bg-black p-2">
        <iframe
          src={resumeUrl}
          className="w-full h-[calc(100vh-1rem)] border-0 rounded"
          title="Nick Chen Resume PDF"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Shell />
    </div>
  );
}

export default App;
