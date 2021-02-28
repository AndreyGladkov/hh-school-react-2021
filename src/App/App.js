import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import fetchAuthor from "../Utils/fetchAuthor";
import fetchReviewer from "../Utils/fetchReviewer";
import User from "../User";
import Settings from "../Settings";

function App() {
  const settings = useSelector(({ getSettings }) => getSettings);
  const author = useSelector(({ getAuthor }) => getAuthor);
  const reviewer = useSelector(({ getReviewer }) => getReviewer);
  const responses = useSelector(({ getResponses }) => getResponses);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!settings.login || author?.login === settings.login) {
      return;
    }
    dispatch(fetchAuthor(settings.login));
  }, [dispatch, settings.login, author])

  useEffect(() => {
    console.log(responses);
  }, [responses])

  function handleGenerate() {
    dispatch(fetchReviewer(settings));
  }

  return (
    <div className="app">
      <div className="content-container">
        <header className="header">
          <h3 className="header__title">ДЗ по React с redux</h3>
          <div className="header__fill"></div>
          <div className="header__commands">
            <button className="btn" onClick={handleGenerate}>Найти проверяющего</button>
            <Settings settings={settings}/>
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
