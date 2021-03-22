const CHANGE_AUTHOR = 'CHANGE_AUTHOR';

export function changeAuthor(userData) {
  return {
    type: CHANGE_AUTHOR,
    author: userData,
  };
}

export default function Author(state = {}, action) {
  switch (action.type) {
    case CHANGE_AUTHOR:
      return action.author;
    default:
      return state;
  }
}
