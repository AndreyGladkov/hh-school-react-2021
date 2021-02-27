import { useEffect, useState } from 'react';
import { getSettings, setSettings as saveSettings } from './localSave'
import { config } from 'react-spring';
import './App.css';
import { Card, Settings, ButtonSettings } from './components'
import { About } from './help';
import { getContributors } from './api/contributors';
import { useSpring, animated } from 'react-spring'
import { delay } from 'delay'
import { getRandomArbitrary } from './consts'

function App() {
  const [users, setUsers] = useState(null);
  const [isSettings, setSettingsVisible] = useState(null);
  const [isAbout, setAbout] = useState(false);
  const [settings, setSettingsRaw] = useState({ blacklist: [], user: '', repo: '' });
  const [blacklist, setBlacklist] = useState([]);
  const [user, setUser] = useState('');
  const [repo, setrepo] = useState('');
  async function handleUsersFetch(repo) {
    setUsers(await getContributors(repo));
    return;
  }
  function setSettings(obj, forceRepo = false) {
    if (forceRepo) {
      handleUsersFetch(obj.repo)
    }
    setSettingsRaw(obj);
    saveSettings(obj)
    setUser(obj.user);
    setrepo(obj.repo);
    setBlacklist(Array.isArray(obj.blacklist) ? [...obj.blacklist] : []);
  }
  function handleSettings() {
    let st = getSettings();
    setSettings(st);
    handleUsersFetch(st.repo);
    return;
  }
  const style = useSpring({
    ...config.slow,
    state: isSettings ? 'in' : 'out',
    to: async next => {
      await next({
        transform: 'translateX(0%)',
      });
    },
    from: async next => {
      await delay(700);
      await next({
        transform: 'translateX(-100%)',
      });
    },
  });
  function addToBlack(val) {
    let v = settings.blacklist.indexOf(val);
    if (v < 0) {
      let st = {};
      st = settings;
      st.blacklist.push(val);
      setSettings(st);
    }
  }
  function deleteFromBlackList(user) {
    let v = settings.blacklist.indexOf(user);
    let st = settings;
    if (v >= 0) {
      st.blacklist.splice(v, 1);
      setSettings(st);
    }
  }
  function changeReviewer(user) { let st = { user: user, repo: settings.repo, blacklist: settings.blacklist }; setSettings(st); }
  function randomReviewer() {
    let usersToRandomize = users.filter((element) => { return settings.blacklist.find(t => t == element.login) ? false : true; });
    if (usersToRandomize.length > 0) {
      let random = getRandomArbitrary(0, usersToRandomize.length);
      changeReviewer(usersToRandomize[random].login);
    } else {
      alert("Нет пользователей для review! Проверьте настройки...");
    }
  }
  useEffect(() => {
    handleSettings();
    return;
  }, []);
  return (
    <div className="App">
      <div className="buttons">
        <ButtonSettings text='Настройки' onClick={() => { isSettings ? setSettingsVisible(false) : setSettingsVisible(true); }} />
        <ButtonSettings text='Рандомный reviewer' onClick={randomReviewer} />
        <ButtonSettings text='Задание' onClick={() => { setAbout(!isAbout); }} />
      </div>
      <div className="wrapper">
        <About isAbout={isAbout} />
        <animated.div className="sidebar">
          <Card black={[...blacklist].includes(user)}
            name={user}
            image={users?.find?.(t => t.login == user)?.avatar_url}
          />
          <animated.div style={{ ...style, display: isSettings ? 'block' : 'none' }}>
            <Settings blacklist={[...blacklist]} user={user} repo={repo}
              onNewReviewer={() => {
                handleUsersFetch(settings.repo);
              }}
              onChangeRepo={(repo) => { setrepo(repo) }}
              clearAll={() => { setSettings({ user: user, repo: repo, blacklist: [] }) }}
              onSaveSettings={(settings) => { setSettings(settings, true); }}
              onAdd={addToBlack}
              onDelete={deleteFromBlackList} />
          </animated.div>
        </animated.div>
        <div className="content">
          {Array.isArray(users) ? users.map((value) => {
            return <Card black={[...blacklist].includes(value.login)} key={value.id} name={value.login} image={value.avatar_url} onBlackList={addToBlack} onRemoveBl={deleteFromBlackList} onClick={changeReviewer} />
          }) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
