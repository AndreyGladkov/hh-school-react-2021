import { SET_REVIEW_DATA } from "../types";

export function setReviewData(developer, reviewer) {
    return {
        type: SET_REVIEW_DATA,
        payload: {
            developer: {
                header: "Developer",
                headerValue: developer.login,
                id: developer.id,
                content: developer.avatar_url,
            },
            reviewer: {
                header: "Reviewer",
                headerValue: reviewer.login,
                id: reviewer.id,
                content: reviewer.avatar_url,
            },
        },
    };
}
