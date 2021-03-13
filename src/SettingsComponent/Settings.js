import React, { useState } from 'react';

const Settings = (props) => {
  const [showSettings, SetShowSettings] = useState(false);

  const [login, SetLogin] = useState(props.settings['login']);
  const [repo, SetRepo] = useState(props.settings['repo']);
  const [blacklist, SetBlacklist] = useState(props.settings['blacklist']);

  let settings = null;

  function SaveAndQuit() {
    props.SetSettings({
      login: login,
      repo: repo,
      blacklist: blacklist,
    });
    SetShowSettings(!showSettings);
  }

  if (showSettings) {
    settings = (
      <div className="settings__container">
        <div className="settings__row">
          <div className="login">
            <input
              type="text"
              onChange={(event) => SetLogin(event.target.value)}
              value={login}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="repo">
            <input
              type="text"
              onChange={(event) => SetRepo(event.target.value)}
              value={repo}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="blackList">
            <input
              type="text"
              onChange={(event) => SetBlacklist(event.target.value)}
              value={blacklist}
              className="input"
            />
          </div>
        </div>
        <div className="settings__row">
          <div className="buttons">
            <button onClick={() => SaveAndQuit()}>Сохранить и выйти</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="settings">
      <button onClick={() => SetShowSettings(!showSettings)}>Settings</button>
      {settings}
    </div>
  );
};

export default Settings;
