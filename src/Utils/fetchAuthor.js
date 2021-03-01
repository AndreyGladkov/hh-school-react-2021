import { setAuthor } from "../redux/Author";
import { setResponses } from "../redux/ApiResponse";

export default function fetchAuthor(userName) {
  return function(dispatch, getState) {
    return fetch(`https://api.github.com/users/${userName}`)
      .then(response => response.json())
      .then(data => {
        dispatch(setResponses(data));
        if (data.login !== undefined) {
          dispatch(setAuthor(data));
        } else {
          console.log('invalid data', data);
        }
      })
      .catch((error) => console.error(error));
  };
}
