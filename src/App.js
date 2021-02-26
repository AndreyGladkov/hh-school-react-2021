import './App.css';
import React, {useState} from 'react';
import Settings from './Settings';
import ReviewerFinder from './ReviewFinder';
import useStateSettings from './useStateSettings';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useStateSettings({login: "", repo: "", blackList: []});

  return (
    <div className="App">
      <header className="App-header">
        <h1>{showSettings ? "Settings" : "Reviewer"}</h1>
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
