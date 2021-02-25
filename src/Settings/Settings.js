import './Settings.css';
import { useState } from 'react';

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

export default Settings;
  