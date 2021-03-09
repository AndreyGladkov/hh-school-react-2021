import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {setSettings} from './models/settings';
import BlackList from './BlackList';

function Settings(props) {
  const [login, setLogin] = useState(props.settings.login);
  const [repo, setRepo] = useState(props.settings.repo);
  const [blackList, setBlackList] = useState(props.settings.blackList);

  const cancel = () => {
    setLogin(props.settings.login);
    setRepo(props.settings.repo);
    setBlackList(props.settings.blackList);
  };

  const addToBlackList = (contributor) => {
    if (!blackList.includes(contributor)) {
      setBlackList([...blackList, contributor]);
    }
  };

  const removeFromBlackList = (contributor) => {
    setBlackList(blackList.filter(value => value !== contributor));
  };

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(props.settings));
  }, [props.settings]);

  return (<div>
    <div>
      <label htmlFor="login">Login</label>&nbsp;
      <input id="login" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
    </div>
    <div>
      <label htmlFor="repo">Repo</label>&nbsp;
      <input id="repo" type="text" value={repo} onChange={(e) => setRepo(e.target.value)} />
    </div>
    <BlackList blackList={blackList} addToBlackList={addToBlackList} removeFromBlackList={removeFromBlackList} />
    <button onClick={() => props.setSettings({login: login, repo: repo, blackList: blackList})}>Save</button>
    <button onClick={cancel}>Cancel</button>
  </div>);
}

export default connect(
  ({settings}) => {return {settings}},
  {setSettings}
)(Settings);
