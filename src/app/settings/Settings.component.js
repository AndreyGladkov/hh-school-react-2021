import React, { useState, useEffect } from 'react';
import './Settings.css';

const SettingsComponent = (prop) => {
  const { settings, setSettings } = prop;
  const [login, setLogin] = useState('');
  const [repo, setRepo] = useState('');
  const [blocklist, setBlocklist] = useState('');
  const [isHidden, setHidden] = useState(false);

  useEffect(() => {
    setLogin(settings[0]);
    setRepo(settings[1]);
    setBlocklist(settings[2]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings([login, repo, blocklist]);
  };

  const toggleVisibility = () => {
    setHidden(!isHidden);
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
                settings[0] ? `For example, ${settings[0]}` : 'Input login'
              }
              onChange={(e) => setLogin(e.target.value)}
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
                settings[1] ? `For example, ${settings[1]}` : 'Input repo'
              }
              onChange={(e) => setRepo(e.target.value)}
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
                settings[2] ? `For example, ${settings[2]}` : 'Input blocklist'
              }
              onChange={(e) => setBlocklist(e.target.value)}
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
