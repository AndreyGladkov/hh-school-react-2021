import { setReviewData } from "../actions/reviewActions";
import { URL_REPOS, URL_USERS } from "../../services/consts";
import { fetchAsync } from "../../services/helpers";

export function fetchReviewDataAsync(repo, login, blacklist) {
    return async function (dispatch) {
        const urlRepo = `${URL_REPOS}/${repo}/contributors`;
        const urlUser = `${URL_USERS}/${login}`;

        let [contributors, user] = await Promise.all([
            fetchAsync(urlRepo, "GET").catch((_) => alert("Bad repo name")),
            fetchAsync(urlUser, "GET").catch((_) => alert("Bad login name")),
        ]);

        if (!contributors || !user) {
            return;
        }

        if (blacklist.length > 0) {
            for (const item of blacklist) {
                contributors = contributors.filter((i) => i.login !== item);
            }
        }

        const random = contributors[Math.floor(Math.random() * contributors.length)];

        const developer = {
            header: "Developer",
            headerValue: user.login,
            id: user.id,
            content: user.avatar_url,
        };

        let reviewer = null;

        if (random) {
            reviewer = {
                header: "Reviewer",
                headerValue: random.login,
                id: random.id,
                content: random.avatar_url,
            };
        }

        dispatch(setReviewData(developer, reviewer));
    };
}
