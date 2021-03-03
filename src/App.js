import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewDataAsync } from "./redux/middlewares/fetchReviewDataAsync";
import { setReviewData } from "./redux/actions/reviewActions";

import { Settings } from "./components";
import { Card } from "./components";
import "./css/App.css";

function App() {
    const [isShowSettings, setShowSettings] = React.useState(true);
    const [repo, setRepo] = React.useState("");

    const gitHubUsers = useSelector((state) => state.gitHubUsers);
    const { developer, reviewer } = useSelector((state) => state.review);
    const dispatch = useDispatch();

    const toogleSettings = () => {
        setShowSettings(!isShowSettings);
    };

    const handler = () => {
        const settings = JSON.parse(localStorage.getItem("settings"));

        if (repo === settings.repo) {
            createReview();
            return;
        }

        dispatch(fetchReviewDataAsync(settings.repo));
        setRepo(settings.repo);
    };

    const createReview = React.useCallback(() => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        const login = settings.login;
        const blacklist = settings.blacklist.split(";");

        if (!gitHubUsers || !login) return;

        const user = gitHubUsers[login];
        if (!user) {
            alert("You don't contribute in this repo");
            return;
        }

        let contributors = Object.keys(gitHubUsers);
        if (blacklist.length > 0) {
            for (const item of blacklist) {
                if (gitHubUsers[item]) {
                    contributors = contributors.filter((i) => i !== item);
                }
            }
        }

        const random = contributors[Math.floor(Math.random() * contributors.length)];
        let rev = null;
        if (random) {
            rev = gitHubUsers[random];
        }

        dispatch(setReviewData(user, rev));
    }, [gitHubUsers, dispatch]);

    React.useEffect(() => {
        //@TODO: Почему здесь пустые значения localStorage ???
        const settings = JSON.parse(localStorage.getItem("settings"));
        console.log(settings);
    }, []);

    React.useEffect(() => {
        createReview();
    }, [createReview]);

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
