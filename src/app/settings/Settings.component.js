import React, { useState, useEffect } from 'react';

const SettingsComponent = (prop) => {
  const { settings, setSettings } = prop;
  const [login, setLogin] = useState('');
  const [repo, setRepo] = useState('');
  const [blocklist, setBlocklist] = useState('');

  useEffect(() => {
    setLogin(settings[0]);
    setRepo(settings[1]);
    setBlocklist(settings[2]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings([login, repo, blocklist]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="loginInput">
          Login:
          <input
            id="loginInput"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label htmlFor="repoInput">
          Repo:
          <input
            id="repoInput"
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
        </label>
        <label htmlFor="blocklistInput">
          Blocklist:
          <input
            id="blocklistInput"
            type="text"
            value={blocklist}
            onChange={(e) => setBlocklist(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SettingsComponent;
