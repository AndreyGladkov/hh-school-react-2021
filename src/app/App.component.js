import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import SettingsComponent from './settings/Settings.component';
import ReviewerContainer from './reviewers/ReviewerContainer.component';
import getData from './reviewers/Reviewer.service';
import { USERS, REPO } from './reviewers/assets/url.constants';
import useLocalStorage from '../hooks/useLocalStorage.hook';
import EmptyData from './reviewers/assets/emptydata.constants';

const AppComponent = () => {
  const [user, setUser] = useState({});
  const [reviewer, setReviewer] = useState({});

  const [settings, setSettings] = useState(['', '', '']);
  const [storeSettings, setStoreSettings] = useLocalStorage('storeSettings');
  const [blocklist, setBlocklist] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  const getRandomReviewer = useCallback(() => {
    if (settings[2]) setBlocklist(settings[2].split(','));

    if (!reviewers) {
      return { name: '', avatar_url: '' };
    }

    const reviewerList = reviewers.filter(
      (filteredReviewers) => !blocklist.includes(filteredReviewers.login),
    );

    const randomReviewer =
      reviewerList[Math.floor(Math.random() * reviewerList.length)];

    return setReviewer(randomReviewer || {});
  }, [reviewers]);

  const setUsersData = (newUser, newReviewers) => {
    setUser(newUser);
    setReviewers([...newReviewers]);
  };

  const getUsersData = useCallback(async () => {
    let newUser = {};
    let newReviewers = [];

    if (settings[0]) {
      newUser = await getData(`${USERS}/${settings[0]}`, EmptyData.USER).then(
        (res) => res,
      );
    }

    if (settings[1]) {
      newReviewers = await getData(
        `${REPO}/${settings[0]}/${settings[1]}/contributors`,
        EmptyData.REVIEWERS,
      );
    }

    return setUsersData(newUser, newReviewers);
  }, [settings]);

  useEffect(() => {
    setSettings(JSON.parse(storeSettings) || '');
  }, []);

  useEffect(() => {
    getUsersData();

    setStoreSettings(JSON.stringify(settings) || '');
  }, [settings]);

  useEffect(() => {
    getRandomReviewer();
  }, [reviewers]);

  return (
    <div className="App">
      <header className="App-header">
        <p className="header-element">hh react homework</p>
        <p className="header-element">now with redux! :3</p>
      </header>
      <main className="App-main">
        <SettingsComponent settings={settings} setSettings={setSettings} />
        {settings[0] ? (
          <ReviewerContainer
            user={user}
            reviewer={reviewer}
            repo={settings[1]} // Вообще, можно, конечно, для репо и отдельный стейт завести, как минимум, для красоты
          />
        ) : null}
      </main>
    </div>
  );
};

export default AppComponent;
