import Api from "../../api/index.js";

const CHANGE_USER_DATA = "CHANGE_USER_DATA";
const CHANGE_USER_DATA_JSON = "CHANGE_USER_DATA_JSON";
const CHANGE_REPOSITORY_CONTRIBUTORS = "CHANGE_REPOSITORY_CONTRIBUTORS";
const CHANGE_REPOSITORY_CONTRIBUTORS_JSON = "CHANGE_REPOSITORY_CONTRIBUTORS_JSON";

const initialState = {
    userData: null,
    userDataJson: null,
    repositoryContributors: null,
    repositoryContributorsJson: null
};

const reducersApi = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_USER_DATA:
            return { ...state, userData: action.userData };
        case CHANGE_USER_DATA_JSON:
            return { ...state, userDataJson: action.userDataJson };
        case CHANGE_REPOSITORY_CONTRIBUTORS:
            return { ...state, repositoryContributors: action.repositoryContributors };
        case CHANGE_REPOSITORY_CONTRIBUTORS_JSON:
            return { ...state, repositoryContributorsJson: action.repositoryContributorsJson };
        default:
            return state;
    }
}

export default reducersApi;

export const apiActionCreators = {
    changeUserData: (userData) => ({ type: CHANGE_USER_DATA, userData }),
    changeUserDataJson: (userDataJson) => ({ type: CHANGE_USER_DATA_JSON, userDataJson }),
    changeRepositoryContributors: (repositoryContributors) => ({
        type: CHANGE_REPOSITORY_CONTRIBUTORS, repositoryContributors
    }),
    changeRepositoryContributorsJson: (repositoryContributorsJson) => ({
        type: CHANGE_REPOSITORY_CONTRIBUTORS_JSON, repositoryContributorsJson
    })
}

export const apiThunkCreators = {
    getUserData: (userName) => async (dispatch) => {
        const userData = await Api.getUserData(userName);
        dispatch(apiActionCreators.changeUserData(userData));
        const userDataJson = await userData.json();
        dispatch(apiActionCreators.changeUserDataJson(userDataJson));
    },

    getRepositoryContributors: (repositoryLink) => async (dispatch) => {
        const repositoryContributors = await Api.getRepositoryContributors(repositoryLink);
        dispatch(apiActionCreators.changeRepositoryContributors(repositoryContributors));
        const repositoryContributorsJson = await repositoryContributors.json();
        dispatch(apiActionCreators.changeRepositoryContributorsJson(repositoryContributorsJson));
    }
}
