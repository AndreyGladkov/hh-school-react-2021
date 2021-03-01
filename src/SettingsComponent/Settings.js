import React, { useState } from 'react';

const Settings = (props) => {
  const [showSettings, ChangeShowSettings] = useState(false);

  let settings = null;

  if (showSettings) {
    settings = (
      <div className="settings__container">
        <div className="settings__row">
          <div className="login">login</div>
        </div>
        <div className="settings__row">
          <div className="repo">repo</div>
        </div>
        <div className="settings__row">
          <div className="blackList">blackList</div>
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
