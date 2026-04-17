import { Terminal } from './components/Terminal';

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/resume') {
    return (
      <div className="min-h-screen bg-black p-2">
        <iframe
          src={`${import.meta.env.BASE_URL}Nick_Chen_Resume.pdf`}
          className="w-full h-[calc(100vh-1rem)] border-0 rounded"
          title="Nick Chen Resume PDF"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Terminal />
    </div>
  );
}

export default App;