import { repoError, selectRepo } from "../reducers/selectedRepoReducer"
import { fetchWithError } from "./fetchWithErrorHandling"


export function fetchGivenRepoData(repo) {
    return function(dispatch, getState) {
        return fetchWithError(repo.contributors_url)
            .then(contributors => dispatch(selectRepo({repo, contributors})))
                .catch((error) => console.log(error.message))
    }
}

export function fetchRepoIfExists(login, repoName) {
    return function(dispatch, getState) {
        return fetchWithError("https://api.github.com/repos/" + login + "/" + repoName)
                    .catch(() => dispatch(repoError("Unknow repository")));
    }  
}

export function fetchRepoContributors(repo) {
    return function(dispatch, getState) {
    if (!repo) return 
    return fetchWithError(repo.contributors_url)
            .then(contributors => dispatch(selectRepo({repo, contributors})))
                .catch(error => console.log(error.message))
    }
}   