import { SET_GITHUB_USERS } from "../types";

export function setGitHubUsers(users) {
    const payload = {};

    for (const user of users) {
        payload[user.login] = user;
    }

    return {
        type: SET_GITHUB_USERS,
        payload,
    };
}