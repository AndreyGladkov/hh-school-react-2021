import { setReviewer } from "../redux/Reviewer";
import { setResponses } from "../redux/ApiResponse";

export default function fetchReviewer({ login, repo, blackList }) {
  return function(dispatch, getState) {
    return fetch(`https://api.github.com/repos/${login}/${repo}/contributors`)
      .then(response => response.json())
      .then(data => {
        dispatch(setResponses(data));
        if (!(data?.length > 0)) {
          console.warning("invalid data", data);
          return;
        }
        blackList = blackList.split(',').map(blackItem => blackItem.trim());
        const filtered = data.filter(item => !blackList.includes(item.login))
        if (!(filtered?.length > 0)) {
          console.warning("invalid data", data);
          return;
        }
        const randomIndex = Math.floor(Math.random() * filtered.length);
        const userData = filtered[randomIndex];
        dispatch(setReviewer(userData));
      })
      .catch((error) => console.error(error));
  };
}
