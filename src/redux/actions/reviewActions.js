import { SET_REVIEW_DATA } from "../types";

export function setReviewData(developer, reviewer) {
    return {
        type: SET_REVIEW_DATA,
        payload: { developer, reviewer },
    };
}
