const selectedRepoInitialState = {
    repo: {},
    error: "",
    contibutors: [],
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
                    ...state.selectedRepo,
                    reviewer: action.payload.reviewer
                }
        case "ERROR":
            return {
                ...selectedRepoInitialState,
                error: "Unknow repository"
            }
        case "CLEAR":
            return {...selectedRepoInitialState};
        default:
            return {...state}; 
    }
}