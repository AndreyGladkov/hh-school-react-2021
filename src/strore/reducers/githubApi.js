import { apiGithub } from "../../api/apiGithub";

const initialState = {
    avatarUrl: "",
    contributors: [],
    errorMessage: ""
};

const CHANGE_AVATAR_URL = "CHANGE_AVATAR_URL";
const CHANGE_CONTRIBUTORS = "CHANGE_CONTRIBUTORS";
const CHANGE_ERROR_MESSAGE = "CHANGE_ERROR_MESSAGE";

const githubApi = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_CONTRIBUTORS:
            return {
                ...state,
                contributors: [...action.contributors]
            }
        case CHANGE_AVATAR_URL:
            return {
                ...state,
                avatarUrl: action.avatarUrl
            }
        case CHANGE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }
}

export default githubApi;

export const githubApiActionCreators = {
    changeAvatarUrl:(avatarUrl) => ({type: CHANGE_AVATAR_URL, avatarUrl}),
    changeContributors:(contributors) => ({type: CHANGE_CONTRIBUTORS, contributors}),
    changeErrorMessage:(errorMessage) => ({type: CHANGE_ERROR_MESSAGE, errorMessage})
}

export const githubApiThunkCreators = {
    changeAvatarUrl:(loginUser) => async (dispatch) => {
        try {
            const avatarUrl = await apiGithub.getAvatarUrl(loginUser);
            dispatch(githubApiActionCreators.changeAvatarUrl(avatarUrl));
            dispatch(githubApiActionCreators.changeErrorMessage(""));
        } catch (e) {
            dispatch(githubApiActionCreators.changeErrorMessage(e.message));
        }
    },

    changeContributors:(fullnameRepo, blacklist, loginUser) => async (dispatch) => {
        let contributors = await apiGithub.getContributors(fullnameRepo);
        contributors = contributors.filter(({ login }) => login !== loginUser && !blacklist.includes(login));
        dispatch(githubApiActionCreators.changeContributors(contributors));
    }
}
