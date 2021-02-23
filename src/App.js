import { useEffect, useState } from 'react';
import { getSettings, setSettings as saveSettings } from './localSave'
import { config } from 'react-spring';
import './App.css';
import { Card, Settings, ButtonSettings } from './components'
import { About } from './help';
import { getContributors } from './api/contributors';
import { useSpring, animated } from 'react-spring'
import { delay } from 'delay'

function App() {
  const [users, setUsers] = useState(null);
  const [isSettings, setSettingsVisible] = useState(null);
  const [settings, setSettings] = useState({ blacklist: [], user: '', repo: '' });
  async function handleUsersFetch(repo) {
    setUsers(await getContributors(repo));
    return;
  }
  function handleSettingsFetch() {
    let st = getSettings();
    setSettings(st);
    console.log(st);
    handleUsersFetch(st.repo);
    return;
  }
  //    //unique,
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
  useEffect(() => {
    handleSettingsFetch();
    return;
  }, []); // onClick={(state) => {state ? setSettingsVisible(false) : setSettingsVisible(true);}}
  return (
    <div className="App">
      <div className="wrapper">
        <ButtonSettings onClick={() => { isSettings ? setSettingsVisible(false) : setSettingsVisible(true); }} />
        <About />
        <animated.div className="sidebar">
          <animated.div style={{ ...style, display: isSettings ? 'block' : 'none' }}>
            <Settings blacklist={settings.blacklist} user={settings.user} repo={settings.repo}
              onNewReviewer={() => {
                handleUsersFetch(settings.repo);
              }}
              onSaveSettings={(settings) => { setSettings(settings); saveSettings(settings) }}
              onAdd={(val) => {
                let v = settings.blacklist.indexOf(val);
                if (v < 0) {
                  let st = {};
                  st.blacklist = settings.blacklist;
                  st.push(val);
                  setSettings(st);
                  saveSettings(st)
                }
              }}
              onDelete={(val) => {
                let v = settings.blacklist.indexOf(val);
                if (v >= 0) {
                  settings.blacklist.splice(v, 1);
                  setSettings(settings);
                  saveSettings(settings)
                }
              }} />
          </animated.div>
        </animated.div>
        <div className="content">
          {Array.isArray(users) ? users.map((value) => {
            return <Card key={value.id} name={value.login} image={value.avatar_url} onClick={(user) => { let settings = { user: user }; setSettings(settings); saveSettings(settings) }} />
          }) : ''}
        </div>
      </div>
    </div>
  );
}

export default App;
