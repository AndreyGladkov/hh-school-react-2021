import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions, { appActions, settingsActions } from '../state/main.actions';
import './Settings.css';
import { getRandomReviewer } from '../reviewers/Reviewer.service';

const SettingsComponent = () => {
  const isHidden = useSelector((state) => state.app.isHidden);
  const reviewerList = useSelector((state) => state.app.reviewerList);
  const settings = useSelector((state) => state.app.settings);

  const login = useSelector((state) => state.settings.login);
  const repo = useSelector((state) => state.settings.repo);
  const blocklist = useSelector((state) => state.settings.blocklist);

  const [previousState, setPreviousState] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreviousState(settings);

    const setReviewer = (data) => {
      dispatch(appActions(actions.AppActions.LOAD_REVIEWER, data));
    };

    if (settings === previousState) {
      getRandomReviewer(reviewerList, blocklist, setReviewer);

      return;
    }

    dispatch(
      appActions(actions.AppActions.UPDATE_SETTINGS, {
        login,
        repo,
        blocklist,
      }),
    );
  };

  const toggleVisibility = () => {
    dispatch(appActions(actions.AppActions.SET_HIDDEN_STATE, !isHidden));
  };

  return (
    <div>
      <button
        className="InputForm-Button"
        onClick={toggleVisibility}
        type="button"
      >
        {!isHidden ? 'Hide settings' : 'Show settings'}
      </button>
      {!isHidden && (
        <form onSubmit={handleSubmit} className="InputForm">
          <label htmlFor="loginInput">
            Login:
            <input
              id="loginInput"
              className="InputForm-Field"
              type="text"
              value={login}
              placeholder={
                settings.login
                  ? `For example, ${settings.login}`
                  : 'Input login'
              }
              onChange={(e) => {
                dispatch(
                  settingsActions(
                    actions.SettingsActions.UPDATE_LOGIN,
                    e.target.value,
                  ),
                );
              }}
            />
          </label>
          <label htmlFor="repoInput">
            Repo:
            <input
              id="repoInput"
              className="InputForm-Field"
              type="text"
              value={repo}
              placeholder={
                settings.repo ? `For example, ${settings.repo}` : 'Input repo'
              }
              onChange={(e) => {
                dispatch(
                  settingsActions(
                    actions.SettingsActions.UPDATE_REPO,
                    e.target.value,
                  ),
                );
              }}
            />
          </label>
          <label htmlFor="blocklistInput">
            Blocklist:
            <input
              id="blocklistInput"
              className="InputForm-Field"
              type="text"
              value={blocklist}
              placeholder={
                settings.blocklist
                  ? `For example, ${settings.blocklist}`
                  : 'Input blocklist'
              }
              onChange={(e) => {
                dispatch(
                  settingsActions(
                    actions.SettingsActions.UPDATE_BLOCKLIST,
                    e.target.value,
                  ),
                );
              }}
            />
          </label>
          <input
            className="InputForm-Button"
            type="submit"
            value={repo ? 'Find reviewer' : 'Submit'}
          />
        </form>
      )}
    </div>
  );
};

export default SettingsComponent;
