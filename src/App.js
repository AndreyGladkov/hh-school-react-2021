import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewDataAsync } from "./redux/middlewares/fetchReviewDataAsync";

import { Settings } from "./components";
import { Card } from "./components";
import "./css/App.css";

function App() {
    const [isShowSettings, setShowSettings] = React.useState(true);
    const developer = useSelector((state) => state.developer);
    const reviewer = useSelector((state) => state.reviewer);
    const dispatch = useDispatch();

    const toogleSettings = (_) => {
        setShowSettings(!isShowSettings);
    };

    const handler = async (_) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        const blacklist = settings.blacklist.split(";");

        dispatch(fetchReviewDataAsync(settings.repo, settings.login, blacklist));
    };

    return (
        <>
            <div className="menu">
                {isShowSettings === true ? <Settings /> : null}
                <div>
                    <button onClick={toogleSettings}>Settings</button>
                    <button onClick={handler}>Generate</button>
                </div>
            </div>
            <div className="review">
                {developer === null ? null : <Card {...developer} />}
                {reviewer === null ? null : <Card {...reviewer} />}
            </div>
        </>
    );
}

export default App;
