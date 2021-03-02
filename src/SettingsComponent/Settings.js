import React, { useState } from 'react';

const Settings = (props) => {
  const [showSettings, ChangeShowSettings] = useState(false);

  const [login, ChangeLoginHandler] = useState('ifuncuran');
  const [repo, ChangeRepoHandler] = useState('repo');
  const [blacklist, ChangeBlacklistHandler] = useState('blacklist');

  let settings = null;

  if (showSettings) {
    settings = (
      <div className="settings__container">
        <div className="settings__row">
          <div className="login">
            <input
              type="text"
              onChange={(event) => ChangeLoginHandler(event.target.value)}
              value={login}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="repo">
            <input
              type="text"
              onChange={(event) => ChangeRepoHandler(event.target.value)}
              value={repo}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="blackList">
            <input
              type="text"
              onChange={(event) => ChangeBlacklistHandler(event.target.value)}
              value={blacklist}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="buttons">
            <button onClick={() => ChangeShowSettings(!showSettings)}>
              Сохранить и выйти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings">
      <button onClick={() => ChangeShowSettings(!showSettings)}>
        Settings
      </button>
      {settings}
    </div>
  );
};

export default Settings;
