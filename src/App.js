import './App.css';
import { useEffect, useState } from 'react';


function Settings(props) {
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

  if (props.hide) {
    return null;
  }
  return (
    <div className="settings">
      <div>
        login 
        <input name="login" value={innerData.login} onChange={handleChange}/>
      </div>
      <div>
        repo 
        <input name="repo" value={innerData.repo} onChange={handleChange}/>
      </div>
      <div>
        blackList 
        <input name="blackList" value={innerData.blackList} onChange={handleChange}/>
      </div>
      <button onClick={(e) => {console.log(innerData); props.onSaveHandler(innerData)}}>Save to LocalStorage</button>
      <button onClick={(e) => {setInnerData(props.settings); props.onSaveHandler()}}>Cancel</button>
    </div>
  );
}

function User(props) {
  if (props.user) {
    return (
      <div className="user">
        <div className="user__name">{props.label}: {props.user.login}</div>
        <img className="user__avatar" src={props.user.avatar_url} alt="" />
      </div>
    );
  } else {
    return (
      <div className="user">
        {props.label} is null
      </div>
    );
  }
}

function App() {
  const [settingsHide, setSettingsHide] = useState(true);
  const [settings, setSettings] = useState({
    login: 'yiisoft',
    repo: 'yii2',
    blackList: ''
  })
  const [user, setUser] = useState(null);
  const [reviewer, setReviewer] = useState(null);
  
  useEffect(() => {
    if (!settings.login || user?.login === settings.login) {
      return;
    }

    fetch(`https://api.github.com/users/${settings.login}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // если пришло что-то другое, то мы уйдет в бесконечный цикл обновлений
        if (data.login === settings.login) {
          setUser(data);
        }
      })
      .catch((error) => console.error(error));
  }, [settings.login, user]);

  function generate(owner, repo) {
    if (!owner || !repo) {
      return;
    }
    fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
      .then((response) => response.json())
      .then((data) => {
        const filtered = data
          // .filter(item => item.login !== owner)
          .filter(item => !settings.blackList.split(',').map(blackItem => blackItem.trim()).includes(item.login))
        const length = filtered ? filtered.length : 0;
        const randomIndex = Math.floor(Math.random() * length);
        setReviewer(filtered[randomIndex]);
      })
      .catch((error) => console.error(error));
  }

  function saveForm(data) {
    setSettingsHide(!settingsHide);
    if (data) {
      // @todo сохранить в LocalStorage
      setSettings((state) => {
        return {...state, ...data};
      });
    }
  }

  return (
    <div className="app">
      <header className="header">
        title Homework
        <button onClick={() => setSettingsHide(!settingsHide)}>Settings</button>
        <Settings hide={settingsHide} settings={settings} onSaveHandler={saveForm}/>
      </header>
      <button onClick={() => generate(settings.login, settings.repo)}>Find reviewer</button>
      <User label={"user"} user={user}/>
      <User label={"reviewer"} user={reviewer}/>
    </div>
  );
}

export default App;
