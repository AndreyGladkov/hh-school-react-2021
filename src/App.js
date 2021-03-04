import { delay } from 'delay';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import { fetchUsers } from './api/contributors';
import './App.css';
import { ButtonSettings, Card, Settings } from './components';
import { getRandomArbitrary } from './consts';
import { About } from './help';
import { aboutOff, aboutOn, settingsOn, setttingsOff } from './store/actions/appsateActions';
import { addBlacklist, clearBlacklist, removeBlacklist, setRepo, setUser } from './store/actions/settingsActions';

function App() {
  const repo = useSelector(state => state.settings.repo, shallowEqual);
  const user = useSelector(state => state.settings.user, shallowEqual)
  const blacklist = useSelector(state => [...state.settings.blacklist], shallowEqual)
  const users = useSelector(state => state.users, shallowEqual);
  const dispatch = useDispatch();
  //const [users, setUsers] = useState(null);
  // const [isSettings, setSettingsVisible] = useState(null);
  // const [isAbout, setAbout] = useState(false);
  const isSettings = useSelector(state => state.appstate.settings, shallowEqual)
  const isAbout = useSelector(state => state.appstate.about, shallowEqual)

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
    dispatch(addBlacklist(val))
  }
  function deleteFromBlackList(user) {
    dispatch(removeBlacklist(user));
  }
  function changeReviewer(user) {
    dispatch(setUser(user));
  }
  function randomReviewer() {
    let usersToRandomize = users.filter((element) => { return ![...blacklist].includes(element.login) });
    if (usersToRandomize.length > 0) {
      let random = getRandomArbitrary(0, usersToRandomize.length);
      changeReviewer(usersToRandomize[random].login);
    } else {
      alert("Нет пользователей для review! Проверьте настройки...");
    }
  }
  function setAbout(state) {
    state ? dispatch(aboutOn()) : dispatch(aboutOff())
  }
  function setSettingsVisible(state) {
    state ? dispatch(settingsOn()) : dispatch(setttingsOff())
  }
  // useEffect(() => {
  //   // handleSettings();
  //   return;
  // }, []);
  return (
    <div className="App">
      <div className="buttons">
        <ButtonSettings text='Настройки' onClick={() => { setSettingsVisible(!isSettings) }} />
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
                //handleUsersFetch(settings.repo);
              }}
              onChangeRepo={(repo) => {
                dispatch(setRepo(repo));
                dispatch(fetchUsers(repo));
              }}
              clearAll={() => {
                dispatch(clearBlacklist())
              }}
              onSaveSettings={(settings) => {
                dispatch(setRepo(repo));
                dispatch(fetchUsers(repo));
              }}
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
