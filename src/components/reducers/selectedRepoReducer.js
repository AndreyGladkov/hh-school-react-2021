const selectedRepoInitialState = {
    repo: {},
    error: "",
    contributors: [],
    reviewer: {}
}

const getSelectedRepoInitialState = () => {
    return JSON.parse(localStorage.getItem("selectedRepo")) === null 
        ? selectedRepoInitialState 
        : JSON.parse(localStorage.getItem("selectedRepo"));
}

export function selectedRepoReducer(state = getSelectedRepoInitialState(), action) {
    switch(action.type) {
        case "SELECT_REPO":
            return {
                ...selectedRepoInitialState,
                repo: action.payload.repo, 
                contributors: action.payload.contributors
            }
        case "SELECT_REVIEWER":
            return {
                    ...state,
                    reviewer: action.payload.reviewer
                }
        case "REPO_ERROR":
            return {
                ...selectedRepoInitialState,
                error: "Unknow repository"
            }
        case "REPO_CLEAR":
            return {...selectedRepoInitialState};
        default:
            return {...state}; 
    }
}