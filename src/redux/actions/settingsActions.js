import { SET_SETTINGS } from "../types";

export function setSettings({ login, repo, blacklist }) {
    return {
        type: SET_SETTINGS,
        payload: { login, repo, blacklist },
    };
}
