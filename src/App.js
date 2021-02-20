import { useEffect, useState } from 'react';
import Generator from './components/Generator/Generator';
import Settings from './components/Settings/Settings';
import { keysLocalStorage } from './keysLocalStorage';
import logo from './logo.svg';
// import './App.css';

function App() {
  const DELIMITER = ";";

  // Работа с логином текущего юзера
  const getInitLoginUser = () => {
    const loginUser = localStorage.getItem(keysLocalStorage.LOGIN_USER);
    return loginUser ?loginUser :"";
  }

  const [loginUser, setLoginUser] = useState(getInitLoginUser());

  const saveLoginUser = (newLoginUser) => {
    localStorage.setItem(keysLocalStorage.LOGIN_USER, newLoginUser);
    setLoginUser(newLoginUser);
  }

  // Работа с названием репозитория
  const getInitFullnameRepo = () => {
    const fullnameRepo = localStorage.getItem(keysLocalStorage.FULLNAME_REPO);
    return fullnameRepo ?fullnameRepo :"";
  }

  const [fullnameRepo, setFullnameRepo] = useState(getInitFullnameRepo());

  const saveFullnameRepo = (newFullnameRepo) => {
    localStorage.setItem(keysLocalStorage.FULLNAME_REPO, newFullnameRepo);
    setFullnameRepo(newFullnameRepo);
  }


  // Работа и сохранение черного списка
  const getInitBlackList = () => {
    let blacklist = localStorage.getItem(keysLocalStorage.BLACK_LIST);
    return blacklist === null ?[] :blacklist.split(DELIMITER);
  }

  const [blacklist, setBlackList] = useState(getInitBlackList());

  const saveBlackList = (newBlacklist) => {
    localStorage.setItem(keysLocalStorage.BLACK_LIST, newBlacklist.join(DELIMITER));
    setBlackList(newBlacklist);
  }

  const addToBlackList = (newLogin) => saveBlackList([
    ...blacklist.filter(login => login !== newLogin), 
    newLogin
  ]);

  const removeFromBlackList = (removeLogin) => saveBlackList([
    ...blacklist.filter(login => login !== removeLogin)
  ]);

  return (
    <div className="App">
      <h1>Генератор ревьюера</h1>

      <Settings
        loginUser={loginUser}
        saveLoginUser={saveLoginUser}
        fullnameRepo={fullnameRepo}
        saveFullnameRepo={saveFullnameRepo}
        blacklist={blacklist}
        addToBlackList={addToBlackList}
        removeFromBlackList={removeFromBlackList}
      />

      <Generator
        loginUser={loginUser}
        fullnameRepo={fullnameRepo}
        blacklist={blacklist}
      />
    </div>
  );
}

export default App;
