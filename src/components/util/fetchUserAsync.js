import {fetchUserError, fetchUserData} from "../reducers/githubUserDataReducer";
import { fetchWithError } from "./fetchWithErrorHandling";


export function fetchUserAsync(githubUser) {
    return function(dispatch, getState) {
        return fetchWithError("https://api.github.com/users/" + githubUser)
                .catch(() => dispatch(fetchUserError("Unknown login")));
    }
}  

export function fetchReposAsync(user) {
    return function(dispatch, getState) {
        if (!user) return;
        return fetchWithError(user.repos_url + "?per_page=100")
                .then(repos => dispatch(fetchUserData({user, repos})))
                    .catch(error => console.log(error.message));
    }
}