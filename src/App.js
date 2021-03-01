import './App.css';
import Settings from './SettingsComponent/Settings.js';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="buttons">
          <button>Поиск ревьюера</button>
          <Settings />
        </div>
        <div className="results"></div>
      </div>
    </div>
  );
}

export default App;
