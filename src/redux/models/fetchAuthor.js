import { changeAuthor } from './Author';

export default function fetchAuthor(authorName) {
  return function (dispatch, getState) {
    return fetch(`https://api.github.com/users/${authorName}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(changeAuthor(data));
      });
  };
}
