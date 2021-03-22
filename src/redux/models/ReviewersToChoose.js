const CHANGE_REVIEWERS_TO_CHOOSE = 'CHANGE_REVIEWERS_TO_CHOOSE';

export function changeReviewersToChoose(usersData) {
  return {
    type: CHANGE_REVIEWERS_TO_CHOOSE,
    reviewersToChoose: usersData,
  };
}

export default function ReviewersToChoose(state = null, action) {
  switch (action.type) {
    case CHANGE_REVIEWERS_TO_CHOOSE: {
      return action.reviewersToChoose;
    }

    default:
      return state;
  }
}
