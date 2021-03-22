import './App.css';
import { setLocalStorage, getFromLocalStorage } from './LocalStorageHandler';
import Settings from './SettingsComponent/Settings.js';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fetchAuthor from './redux/models/fetchAuthor';
import fetchReviewers from './redux/models/fetchReviewers';

function App() {
  const author = useSelector(({ Author }) => Author);
  const reviewer = useSelector(({ Reviewer }) => Reviewer);
  const reviewersToChoose = useSelector(
    ({ ReviewersToChoose }) => ReviewersToChoose
  );
  const blacklisted = useSelector(({ Blacklisted }) => Blacklisted);

  const dispatch = useDispatch();

  const [settings, SetSettings] = useState(
    getFromLocalStorage({
      login: 'facebook',
      repo: 'react',
      blacklist: 'ifuncuran,petehunt,zpao,keyz,bgw,syranide',
    })
  );

  useEffect(() => {
    setLocalStorage(settings);
  }, [settings]);

  function settingsHandler(settings) {
    SetSettings(settings);
  }

  const getRewiever = () => {
    dispatch(fetchAuthor(settings.login));
    dispatch(fetchReviewers(settings));
  };

  console.log('from APP', reviewersToChoose);

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
            {author && (
              <div className="user">
                user name: {author.login}
                <hr />
                <img src={author.avatar_url} alt="" />
                <hr />
              </div>
            )}
            {!author && 'user is null'}
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
