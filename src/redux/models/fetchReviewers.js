import { changeReviewer } from './Reviewer';
import { changeReviewersToChoose } from './ReviewersToChoose';
import { changeBlacklisted } from './Blacklisted';

export default function fetchReviewers(settings) {
  const blacklist = settings.blacklist.split(',');

  function ReviewerHandler(data, dispatch) {
    const filtered = data.filter((user) => !blacklist.includes(user.login));
    const blacklisted = data.filter((user) => blacklist.includes(user.login));
    console.log('from reviewerHandler', filtered);
    dispatch(changeReviewersToChoose(filtered)); //setReviewersToChoose
    dispatch(changeBlacklisted(blacklisted)); //setBlacklisted
    dispatch(
      changeReviewer(
        filtered[Math.floor(Math.random() * (filtered.length - 1))]
      )
    ); //setReviewer
  }

  return function (dispatch, getState) {
    return fetch(
      `https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`
    )
      .then((response) => response.json())
      .then((data) => ReviewerHandler(data, dispatch))
      .catch((error) => console.error(error));
  };
}
