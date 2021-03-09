import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "../redux/actions/settingsActions";
import "../css/Settings.css";

export default function Settings() {
    const login = useSelector((state) => state.settings.login);
    const repo = useSelector((state) => state.settings.repo);
    const blacklist = useSelector((state) => state.settings.blacklist);
    const dispatch = useDispatch();

    return (
        <form
            className="settings"
            action=""
            onChange={(event) => {
                const formData = new FormData(event.currentTarget);
                const settings = {
                    login: formData.get("login").trim(),
                    repo: formData.get("repo").trim(),
                    blacklist: formData.get("blacklist").trim(),
                };

                dispatch(setSettings(settings));
            }}>
            <div className="option">
                <label className="option__label">Login:</label>
                <input
                    className="option__input"
                    type="text"
                    name="login"
                    defaultValue={login}
                    placeholder="example"
                />
            </div>

            <div className="option">
                <label className="option__label">Repo:</label>
                <input
                    className="option__input"
                    type="text"
                    name="repo"
                    defaultValue={repo}
                    placeholder="owner/repo"
                />
            </div>

            <div className="option">
                <label className="option__label">Blacklist:</label>
                <input
                    className="option__input"
                    type="text"
                    name="blacklist"
                    defaultValue={blacklist}
                    placeholder="one;two;three"
                />
            </div>
        </form>
    );
}
