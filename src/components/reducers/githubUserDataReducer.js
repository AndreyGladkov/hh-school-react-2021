const githubUserDataInitialState = {
    user: {},
    repos: [],
    error: ""
}

const getGithubUserDataInitialState = () => {
    return JSON.parse(localStorage.getItem("githubUserData")) === null 
        ? githubUserDataInitialState   
        : JSON.parse(localStorage.getItem("githubUserData"));
}

export function githubUserDataReducer(state = getGithubUserDataInitialState(), action) {
    switch (action.type) {
        case "FETCH_USER":
            return {
                user: action.payload.user, 
                repos: action.payload.repos,
                error: ""
            }
        case "USER_ERROR":
            return {
                ...githubUserDataInitialState,
                error: action.payload.error
            }
        case "USER_CLEAR":
            return {...githubUserDataInitialState}
        default:
            return {...state};
    }
}