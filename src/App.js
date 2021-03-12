import './App.css';
import getUserFromAPI from './getUserFromAPI';
import getReviewerFromAPI from './getReviewerFromAPI';
import Settings from './SettingsComponent/Settings.js';
import React, { useState } from 'react';

function App() {
  const [reviewer, SetReviewer] = useState(null);
  const [reviewersToChoose, SetReviewersToChoose] = useState(null);
  const [blacklisted, SetBlacklisted] = useState(null);
  const [user, SetUser] = useState(null);
  // пока без локал хоста...
  const [settings, SetSettings] = useState({
    login: 'facebook',
    repo: 'react',
    blacklist: 'petehunt,zpao,keyz,bgw',
  });

  function settingsHandler(settings) {
    SetSettings(settings);
  }

  const getRewiever = () => {
    getUserFromAPI(settings.login, SetUser);
    getReviewerFromAPI(
      settings,
      SetReviewer,
      SetReviewersToChoose,
      SetBlacklisted
    );
  };

  return (
    <div className="App">
      <div className="content">
        <div className="buttons">
          <button onClick={() => getRewiever()}>Поиск ревьюера</button>
          <Settings settings={settings} SetSettings={settingsHandler} />
        </div>
        <hr />
        <div className="results">
          <div className="user-container">
            {user && (
              <div className="user">
                user name: {user.name}
                <hr />
                <img src={user.avatar_url} alt="" />
                <hr />
              </div>
            )}
            {!user && 'user is null'}
          </div>
          <div className="reviewer-container">
            {reviewer && (
              <div className="reviewer">
                reviewer name: {reviewer.login}
                <hr />
                <img src={reviewer.avatar_url} alt="" />
              </div>
            )}
            {!reviewer && 'reviewer is null'}
          </div>
        </div>
        <div className="rewiewers-to-choose">
          <p>Выбран из следующего списка:</p>
          <ul>
            {reviewersToChoose &&
              reviewersToChoose.map((user, index) => {
                return <li key={index}>{user.login}</li>;
              })}
            {!reviewersToChoose && 'reviewersToChoose is null'}
          </ul>
        </div>
        <hr />
        <div className="blacklisted">
          <p>Следующие логины из ревьюеров оказались в черном списке</p>
          <ul>
            {blacklisted &&
              blacklisted.map((user, index) => {
                return <li key={index}>{user.login}</li>;
              })}
            {!blacklisted && 'blacklisted is null'}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
