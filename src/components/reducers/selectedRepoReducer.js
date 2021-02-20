const selectedRepoInitialState = {
    repo: {},
    error: "",
    contributors: [],
    reviewer: {},
};

const getSelectedRepoInitialState = () => {
    if (localStorage.getItem("selectedRepo") === "undefined")
        return selectedRepoInitialState;
    return JSON.parse(localStorage.getItem("selectedRepo")) === null
        ? selectedRepoInitialState
        : JSON.parse(localStorage.getItem("selectedRepo"));
};

const initialState = getSelectedRepoInitialState();

export function selectRepo(repoData) {
    console.log(repoData);
    return {
        type: "SELECT_REPO",
        payload: repoData,
    };
}

export function selectReviewer(reviewer) {
    return {
        type: "SELECT_REVIEWER",
        payload: { reviewer: reviewer },
    };
}

export function repoError(error) {
    return {
        type: "REPO_ERROR",
        payload: { error: error },
    };
}

export function clearRepo() {
    return {
        type: "REPO_CLEAR",
    };
}

export function selectedRepoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case "SELECT_REPO":
            return {
                ...selectedRepoInitialState,
                repo: payload.repo,
                contributors: payload.contributors,
            };
        case "SELECT_REVIEWER":
            return {
                ...state,
                reviewer: payload.reviewer,
            };
        case "REPO_ERROR":
            return {
                ...selectedRepoInitialState,
                error: payload.error,
            };
        case "REPO_CLEAR":
            return { ...selectedRepoInitialState };
        default:
            return { ...state };
    }
}
