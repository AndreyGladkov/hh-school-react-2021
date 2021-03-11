import './App.css';
import getUserFromAPI from './getUserFromAPI';
import getReviewerFromAPI from './getReviewerFromAPI';
import Settings from './SettingsComponent/Settings.js';
import React, { useState } from 'react';

function App() {
  const [reviewer, SetReviewer] = useState(null);
  const [reviewersToChoose, SetReviewersToChoose] = useState(null);
  // пока без локал хоста...
  const [settings, SetSettings] = useState({
    login: 'facebook',
    repo: 'react',
    blacklist: '1,2,3',
  });

  // тут достаем данные из гитхаба:
  const user = getUserFromAPI(settings.login);

  function settingsHandler(settings) {
    SetSettings(settings);
  }

  const getRewiever = () => {
    // тоже достаем данные из гитхаба и сетим в ревьювер, поскольку по нажатию кнопки вызывается - из хука переделал в функцию
    getReviewerFromAPI(settings, SetReviewer, SetReviewersToChoose);
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
        <div className="test">
          <ul>
            {reviewersToChoose &&
              reviewersToChoose.map((user) => {
                return <li>{user.login}</li>;
              })}
            {!reviewersToChoose && 'reviewersToChoose is null'}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
