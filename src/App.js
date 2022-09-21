import './App.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Settings from './components/Settings';
import ReviewerFinder from './components/ReviewerFinder';
import { setSettings } from './store/actions';

function App(props) {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.getItem('settings')
      && props.setSettings(JSON.parse(localStorage.getItem('settings')));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{showSettings ? "Settings" : "Reviewer"}</h1>
      </header>
      <main>
        <button onClick={() => setShowSettings(!showSettings)}>{showSettings ? "Hide" : "Show"} settings</button>
        {showSettings ?
          <Settings /> :
          <ReviewerFinder />}
      </main>
    </div>
  );
}

export default connect(
  null,
  { setSettings }
)(App);
