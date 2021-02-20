const githubUserDataInitialState = {
    user: {},
    repos: [],
    error: "",
};

const getGithubUserDataInitialState = () => {
    if (localStorage.getItem("githubUserData") === "undefined")
        return githubUserDataInitialState;
    return JSON.parse(localStorage.getItem("githubUserData")) === null
        ? githubUserDataInitialState
        : JSON.parse(localStorage.getItem("githubUserData"));
};

const initialState = getGithubUserDataInitialState();

export function fetchUserData(userData) {
    return {
        type: "FETCH_USER",
        payload: userData,
    };
}

export function fetchUserError(error) {
    return {
        type: "USER_ERROR",
        payload: { error: error },
    };
}

export function clearUserData() {
    return {
        type: "USER_CLEAR",
    };
}

export function githubUserDataReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "FETCH_USER":
            return {
                user: payload.user,
                repos: payload.repos,
                error: "",
            };
        case "USER_ERROR":
            return {
                ...githubUserDataInitialState,
                error: payload.error,
            };
        case "USER_CLEAR":
            return { ...githubUserDataInitialState };
        default:
            return { ...state };
    }
}
