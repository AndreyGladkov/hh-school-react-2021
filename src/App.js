import React from "react";
import { fetchAsync } from "./services/helpers";
import { URL_REPOS, URL_USERS } from "./services/consts";

import { Settings } from "./components";
import { Card } from "./components";
import "./css/App.css";

function App() {
    const [isShowSettings, setShowSettings] = React.useState(true);
    const [developer, setDeveloper] = React.useState(null);
    const [reviewer, setReviewer] = React.useState(null);

    const toogleSettings = (_) => {
        setShowSettings(!isShowSettings);
    };

    const handler = async (_) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        const blacklist = settings.blacklist.split(";");
        const urlRepo = `${URL_REPOS}/${settings.repo}/contributors`;
        const urlUser = `${URL_USERS}/${settings.login}`;

        let [contributors, user] = await Promise.all([
            fetchAsync(urlRepo, "GET").catch((_) => alert("Bad repo name")),
            fetchAsync(urlUser, "GET").catch((_) => alert("Bad login name")),
        ]);

        if (!contributors || !user) {
            return;
        }

        if (blacklist.length > 0) {
            for (const item of blacklist) {
                contributors = contributors.filter((i) => i.login !== item);
            }
        }

        const random = contributors[Math.floor(Math.random() * contributors.length)];

        const current = {
            header: "Developer",
            headerValue: user.login,
            id: user.id,
            content: user.avatar_url,
        };

        if (random) {
            const target = {
                header: "Reviewer",
                headerValue: random.login,
                id: random.id,
                content: random.avatar_url,
            };

            setReviewer(target);
        } else {
            setReviewer(null);
        }

        setDeveloper(current);
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
