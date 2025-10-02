import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from './components/Terminal';
import { FileSystem } from './utils/fileSystem';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Terminal />
    </div>
  );
}

export default App;