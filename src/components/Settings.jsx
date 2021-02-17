import React from "react";
import "../css/Settings.css";

export default function Settings() {
    const [login, setLogin] = React.useState("");
    const [repo, setRepo] = React.useState("");
    const [blacklist, setBlacklist] = React.useState("");

    React.useEffect(() => {
        const settings = JSON.parse(localStorage.getItem("settings"));

        if (settings !== null) {
            setLogin(settings.login || "");
            setRepo(settings.repo || "");
            setBlacklist(settings.blacklist || "");
        }
    }, []);
    React.useEffect(() => {
        localStorage.setItem("settings", JSON.stringify({ login, repo, blacklist }));
    }, [login, repo, blacklist]);

    const onLoginChange = (event) => {
        setLogin(event.target.value.trim());
    };

    const onRepoChange = (event) => {
        setRepo(event.target.value.trim());
    };

    const onBlacklistChange = (event) => {
        setBlacklist(event.target.value.trim());
    };

    return (
        <div className="settings">
            <div className="option">
                <label className="option__label">Login:</label>
                <input
                    className="option__input"
                    type="text"
                    value={login}
                    onChange={onLoginChange}
                    placeholder="example"
                />
            </div>

            <div className="option">
                <label className="option__label">Repo:</label>
                <input
                    className="option__input"
                    type="text"
                    value={repo}
                    onChange={onRepoChange}
                    placeholder="owner/repo"
                />
            </div>

            <div className="option">
                <label className="option__label">Blacklist:</label>
                <input
                    className="option__input"
                    type="text"
                    value={blacklist}
                    onChange={onBlacklistChange}
                    placeholder="one;two;three"
                />
            </div>
        </div>
    );
}
