import './Settings.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../redux/Settings";

function Settings(props) {
  const [settingsHide, setSettingsHide] = useState(true);
  const settings = useSelector(({ getSettings }) => getSettings);
  const dispatch = useDispatch();
  const login = useRef(null);
  const repo = useRef(null);
  const blackList = useRef(null);
  const keySettings = 'savedSettings';

  useEffect(() => {
    const rawValue = localStorage.getItem(keySettings);
    if (rawValue) {
      dispatch(setSettings(JSON.parse(rawValue)));
    } else {
      const initialState = {
        login: 'razikov',
        repo: 'hh-school-react-2021',
        blackList: ''
      };
      dispatch(setSettings(initialState));
    }
  }, [dispatch])

  useEffect(() => {
    if (settings.login || settings.repo || settings.blackList) {
      localStorage.setItem(keySettings, JSON.stringify(settings));
    }
  }, [settings])

  function handleSave() {
    setSettingsHide(!settingsHide);
    dispatch(setSettings({
      login: login.current.value,
      repo: repo.current.value,
      blackList: blackList.current.value
    }));
  }
  
  function handleCancel() {
    setSettingsHide(!settingsHide);
  }

  return (
    <div className="settings">
      <button className="btn" onClick={() => setSettingsHide(!settingsHide)}>Настройки</button>
      {
        !settingsHide
        ? <div className="settings-form">
          <div className="form-row">
            <label className="form-label">login</label>
            <input className="form-input" name="login" ref={login} defaultValue={settings.login}/>
            <div className="form-hint">login git-пользователя</div>
          </div>
          <div className="form-row">
            <label className="form-label">repo</label>
            <input className="form-input" name="repo" ref={repo} defaultValue={settings.repo}/>
            <div className="form-hint">Название репозитория, принадлежащего git-пользователю</div>
          </div>
          <div className="form-row">
            <label className="form-label">blackList</label>
            <input className="form-input" name="blackList" ref={blackList} defaultValue={settings.blackList}/>
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

export default Settings;
  