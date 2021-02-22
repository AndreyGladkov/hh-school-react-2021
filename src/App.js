import './App.css';
import { useEffect, useState } from 'react';
const keySettings = 'savedSettings';
const localStorage = window.localStorage;

const saveSettingsLocalStorage = (value) => {
  localStorage.setItem(keySettings, JSON.stringify(value));
}

const loadSettingsLocalStorage = (defaultValue) => {
  let rawValue = localStorage.getItem(keySettings);
  if (!rawValue) {
      localStorage.setItem(keySettings, JSON.stringify(defaultValue));
      return defaultValue;
  }
  return JSON.parse(rawValue);
}

function Settings(props) {
  const [settingsHide, setSettingsHide] = useState(true);
  const [innerData, setInnerData] = useState(props.settings)

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setInnerData((state) => {
      return {
        ...state, [name]: value
      }
    });
  }

  function handleSave() {
    setSettingsHide(!settingsHide);
    props.onSaveHandler(innerData);
  }
  
  function handleCancel() {
    setSettingsHide(!settingsHide);
    setInnerData(props.settings);
  }

  return (
    <div className="settings">
      <button className="btn" onClick={() => setSettingsHide(!settingsHide)}>Настройки</button>
      {
        !settingsHide
        ? <div className="settings-form">
          <div className="form-row">
            <label className="form-label">login</label>
            <input className="form-input" name="login" value={innerData.login} onChange={handleChange}/>
            <div className="form-hint">login git-пользователя</div>
          </div>
          <div className="form-row">
            <label className="form-label">repo</label>
            <input className="form-input" name="repo" value={innerData.repo} onChange={handleChange}/>
            <div className="form-hint">Название репозитория, принадлежащего git-пользователю</div>
          </div>
          <div className="form-row">
            <label className="form-label">blackList</label>
            <input className="form-input" name="blackList" value={innerData.blackList} onChange={handleChange}/>
            <div className="form-hint">Пример: login1, login2, loginN</div>
          </div>
          <div className="form-row">
            <div className="buttons">
              <button className="btn" onClick={handleSave}>Сохранить</button>
              <button className="btn" onClick={handleCancel}>Отменить</button>
            </div>
          </div>
        </div>
        : null
      }
    </div>
  );
}

function User(props) {
  if (props.user) {
    return (
      <div className="user">
        <img width="200px" height="200px" className="user__avatar" src={props.user.avatar_url} alt="" />
        <div className="user__name">{props.label}: {props.user.login}</div>
      </div>
    );
  } else {
    return (
      <div className="user">
        {props.label}: не найден
      </div>
    );
  }
}

function App() {
  const [settings, setSettings] = useState(loadSettingsLocalStorage({
    login: 'razikov',
    repo: 'hh-school-react-2021',
    blackList: ''
  }));
  const [user, setUser] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  
  useEffect(() => {
    if (!settings.login || user?.login === settings.login) {
      return;
    }

    fetch(`https://api.github.com/users/${settings.login}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch user', data)
        // если пришло что-то другое, то без проверки мы уйдем в бесконечный цикл обновлений
        if (data.login === settings.login) {
          setUser(data);
        }
      })
      .catch((error) => console.error(error));
  }, [settings.login, user]);

  function generateHandler() {
    console.log('generate', !settings.login || !settings.repo)
    if (!settings.login || !settings.repo) {
      return;
    }
    fetch(`https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`)
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch contributors', data)
        if (!data?.length > 0) {
          return;
        }
        const filtered = data
          .filter(item => !settings.blackList
            .split(',').map(blackItem => blackItem.trim())
            .includes(item.login)
          )
        if (filtered && filtered.length > 0) {
          const randomIndex = Math.floor(Math.random() * filtered.length);
          setReviewer(filtered[randomIndex]);
        }
      })
      .catch((error) => console.error(error));
  }

  function handleSaveSettings(data) {
    if (data) {
      saveSettingsLocalStorage(data)
      setSettings(data);
    }
  }

  return (
    <div className="app">
      <div className="content-container">
        <header className="header">
          <h3 className="header__title">ДЗ по React без redux</h3>
          <div className="header__fill"></div>
          <div className="header__commands">
            <button className="btn" onClick={generateHandler}>Найти проверяющего</button>
            <Settings settings={settings} onSaveHandler={handleSaveSettings}/>
          </div>
        </header>
        <main className="user-pair">
          <User label={"Автор"} user={user}/>
          <User label={"Проверяющий"} user={reviewer}/>
        </main>
      </div>
    </div>
  );
}

export default App;
