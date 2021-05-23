import ApiConstants from './ApiConstants';
import Constants from "../components/Constants";

const Api = {
    async getUserData(userName) {
        return await fetch(`${ApiConstants.API_BASE_URL}/users/${userName}`)
    },
    async getRepositoryContributors(repositoryLink) {
        const repositoryNameParts = repositoryLink.split(`${Constants.GITHUB_BASE_URL}/`);

        return await fetch(`${ApiConstants.API_BASE_URL}/repos/${repositoryNameParts[1]}/contributors`);
    }
}

export default Api;
