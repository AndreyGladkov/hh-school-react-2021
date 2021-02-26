import React, { useEffect, useState } from 'react';
import './App.css';
import SettingsComponent from './settings/Settings.component';
import ReviewerContainer from './reviewers/ReviewerContainer.component';
import getData from './reviewers/Reviewer.service';
import { USERS, REPO } from './reviewers/assets/url.constants';
import useLocalStorage from '../hooks/useLocalStorage.hook';

const AppComponent = () => {
  const [user, setUser] = useState({});
  const [reviewer, setReviewer] = useState({});

  const [settings, setSettings] = useState(['', '', '']);
  const [storeSettings, setStoreSettings] = useLocalStorage('storeSettings');
  const [blocklist, setBlocklist] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  const getUsersData = async () => {
    if (settings[0]) {
      const newUser = await getData(`${USERS}/${settings[0]}`).then(
        (res) => res,
      );

      setUser(newUser);
    }

    if (settings[1]) {
      const newReviewers = await getData(
        `${REPO}/${settings[0]}/${settings[1]}/contributors`,
      );

      setReviewers(newReviewers);
    }

    return true;
  };

  const getRandomReviewer = () => {
    if (settings[2]) setBlocklist(settings[2].split(','));
    if (!reviewers) {
      return { name: 'Загрузка...', avatar_url: '' };
    }

    const reviewerList = reviewers.filter(
      (rev) => !blocklist.includes(rev.login),
    );

    const randomReviewer =
      reviewerList[Math.floor(Math.random() * reviewerList.length)];

    setReviewer(randomReviewer);
    return true;
  };

  useEffect(() => {
    setSettings(JSON.parse(storeSettings));
  }, []);

  useEffect(() => {
    getUsersData();
    getRandomReviewer();
    setStoreSettings(JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="App">
      <header className="App-header">
        <p className="header-element">memka</p>
        <p className="header-element">meow :3</p>
      </header>
      <main className="App-main">
        <SettingsComponent settings={settings} setSettings={setSettings} />
        {settings[0] ? (
          <ReviewerContainer
            user={user}
            reviewer={reviewer}
            repo={settings[1]}
          />
        ) : null}
      </main>
    </div>
  );
};

export default AppComponent;
