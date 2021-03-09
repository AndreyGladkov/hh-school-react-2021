import { setGitHubUsers } from "../actions/gitHubUsersActions";
import { URL_REPOS } from "../../services/consts";
import { fetchAsync } from "../../services/helpers";

export function fetchReviewDataAsync(repo) {
    return async function (dispatch) {
        const urlRepo = `${URL_REPOS}/${repo}/contributors`;

        const contributors = await fetchAsync(urlRepo, "GET").catch((_) => alert("Bad repo name"));
        if (!contributors) {
            return;
        }

        dispatch(setGitHubUsers(contributors));
    };
}
