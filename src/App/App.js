import './App.css';
import { useState } from 'react';
import getReviewerData from "../Utils/getReviewerData";
import useGetAuthorData from "../Utils/useGetAuthorData";
import useGetSettingsData from "../Utils/useGetSettingsData";
import User from "../User";
import Settings from "../Settings";

function App() {
  const [reviewer, setReviewer] = useState(null);
  const [settings, setSettings] = useGetSettingsData({
    login: 'razikov',
    repo: 'hh-school-react-2021',
    blackList: ''
  });
  const author = useGetAuthorData(settings);

  function handleGenerate() {
    getReviewerData(settings, setReviewer);
  }

  function handleSaveSettings(data) {
    setSettings(data);
  }

  return (
    <div className="app">
      <div className="content-container">
        <header className="header">
          <h3 className="header__title">ДЗ по React без redux</h3>
          <div className="header__fill"></div>
          <div className="header__commands">
            <button className="btn" onClick={handleGenerate}>Найти проверяющего</button>
            <Settings settings={settings} onSaveHandler={handleSaveSettings}/>
          </div>
        </header>
        <main className="user-pair">
          <User label={"Автор"} user={author}/>
          <User label={"Проверяющий"} user={reviewer}/>
        </main>
      </div>
    </div>
  );
}

export default App;
