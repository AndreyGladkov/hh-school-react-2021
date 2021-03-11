import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions, { appActions } from './state/main.actions';
import './App.css';
import SettingsComponent from './settings/Settings.component';
import ReviewerContainer from './reviewers/ReviewerContainer.component';
import useLocalStorage from '../hooks/useLocalStorage.hook';
import getData, { getRandomReviewer } from './reviewers/Reviewer.service';
import { REPO, USERS } from './reviewers/assets/url.constants';
import EmptyData from './reviewers/assets/emptydata.constants';

const AppComponent = () => {
  const user = useSelector((store) => store.app.user);
  const reviewer = useSelector((store) => store.app.reviewer);
  const reviewerList = useSelector((store) => store.app.reviewerList);
  const settings = useSelector((store) => store.app.settings);
  const isLoading = useSelector((store) => store.app.loading);

  const [storeSettings, setStoreSettings] = useLocalStorage('storeSettings');

  const dispatch = useDispatch();

  const setReviewer = (data) => {
    dispatch(appActions(actions.AppActions.LOAD_REVIEWER, data));
  };

  const writeToHistory = (data) => {
    const tempData = data;
    // eslint-disable-next-line no-console
    console.log('Api returned: ', tempData);
  };

  const getUserData = async () => {
    let data = {};

    if (settings.login) {
      data = await getData(
        `${USERS}/${settings.login}`,
        EmptyData.USER,
        writeToHistory,
      ).then((res) => res);
    }

    return data;
  };

  const getReviewersData = async () => {
    let data = [];

    if (settings.repo) {
      data = await getData(
        `${REPO}/${settings.login}/${settings.repo}/contributors`,
        EmptyData.REVIEWERS,
        writeToHistory,
      ).then((res) => res);
    }

    return data;
  };

  const fetchGitData = async (type) => {
    if (type === 'USER') {
      dispatch(appActions(actions.AppActions.LOAD_USER));
    }

    dispatch(appActions(actions.AppActions.LOAD_REVIEWER_LIST));

    try {
      if (type === 'USER') {
        const data = await getUserData();

        dispatch(appActions(actions.AppActions.LOAD_USER_SUCCESS, data));

        return null;
      }

      const data = await getReviewersData();

      dispatch(appActions(actions.AppActions.LOAD_REVIEWER_LIST_SUCCESS, data));
    } catch (error) {
      if (type === 'USER') {
        dispatch(appActions(actions.AppActions.LOAD_USER_FAILURE));

        return null;
      }

      dispatch(appActions(actions.AppActions.LOAD_REVIEWER_LIST_FAILURE));
    }

    return null;
  };

  useEffect(() => {
    dispatch(
      appActions(
        actions.AppActions.UPDATE_SETTINGS,
        JSON.parse(storeSettings) || {},
      ),
    );
  }, []);

  useEffect(() => {
    fetchGitData('USER');
    fetchGitData('REVIEWERS');

    setStoreSettings(JSON.stringify(settings) || '');
  }, [settings]);

  useEffect(() => {
    getRandomReviewer(reviewerList, settings.blocklist, setReviewer);
  }, [reviewerList]);

  return (
    <div className="App">
      <header className="App-header">
        <p className="header-element">hh react homework</p>
        <p className="header-element">now with redux! :3</p>
      </header>
      <main className="App-main">
        <SettingsComponent />
        <ReviewerContainer
          user={user}
          reviewer={reviewer}
          repo={settings.repo}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default AppComponent;
