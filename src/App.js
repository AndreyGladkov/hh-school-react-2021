import React from "react";
import { fetchAsync } from "./services/helpers";
import { URL_REPOS } from "./services/consts";

import { Settings } from "./components";
import { Card } from "./components";
import "./css/App.css";

function App() {
    const [isFirstRender, setIsFirstRender] = React.useState(true);
    const [isShowSettings, setShowSettings] = React.useState(true);
    const [developer, setDeveloper] = React.useState(null);
    const [reviewer, setReviewer] = React.useState(null);

    const toogleSettings = (_) => {
        setShowSettings((prev) => !prev);
    };

    const handler = async (_) => {
        const settings = JSON.parse(localStorage.getItem("settings"));
        const blacklist = settings.blacklist.split(";");
        const url = `${URL_REPOS}/${settings.login}/${settings.repo}/contributors`;
        let resp;

        try {
            resp = await fetchAsync(url, "GET");
        } catch {
            alert("Bad login or repo name");
            return;
        }

        const self = resp.find((i) => i.login === settings.login);

        if (blacklist.length > 0) {
            for (const item of blacklist) {
                resp = resp.filter((i) => i.login !== item);
            }
        }

        const random = resp[Math.floor(Math.random() * resp.length)];

        const current = {
            header: "Developer",
            headerValue: self.login,
            id: self.id,
            content: self.avatar_url,
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
        setIsFirstRender(false);
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
            {isFirstRender === true ? null : (
                <div className="review">
                    <Card {...developer} />
                    {reviewer === null ? null : <Card {...reviewer} />}
                </div>
            )}
        </>
    );
}

export default App;
