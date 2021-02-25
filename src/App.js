import './App.css';
import React, {useState, useEffect} from 'react';
import Settings from './Settings';
import ReviewerFinder from './ReviewFinder';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({login: "", repo: "", blackList: []});

  useEffect(() => {
    localStorage.getItem('settings') &&
      setSettings(JSON.parse(localStorage.getItem('settings')));
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{showSettings ? "Reviewer" : "Settings"}</h1>
      </header>
      <main>
        <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? "Hide" : "Show"} settings</button>
        {showSettings ?
          <Settings settings={settings} saveSetting={(settings) => setSettings(settings)} /> : 
          <ReviewerFinder settings={settings} />}
      </main>
    </div>
  );
}

export default App;
