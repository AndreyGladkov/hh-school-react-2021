const CHANGE_REVIEWER = 'CHANGE_REVIEWER';

export function changeReviewer(userData) {
  return {
    type: CHANGE_REVIEWER,
    reviewer: userData,
  };
}

export default function Reviewer(state = {}, { type, reviewer }) {
  switch (type) {
    case CHANGE_REVIEWER:
      return reviewer;
    default:
      return state;
  }
}
