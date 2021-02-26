const selector = {
    getAvatarUrl(state) {
        return state.githubApi.avatarUrl;
    },

    getContibutors(state) {
        return state.githubApi.contributors;
    },

    getErrorMessage(state) {
        return state.githubApi.errorMessage;
    }
}

export default selector;