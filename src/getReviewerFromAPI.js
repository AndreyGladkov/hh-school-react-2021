export default (settings, setReviewer, setReviewersToChoose) => {
  console.log('getReviewer');

  fetch(
    `https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`
  )
    .then((response) => response.json())
    .then((data) => ReviewerHandler(data))
    .catch((error) => console.error(error));

  function ReviewerHandler(data) {
    console.log(data.length);
    console.log(JSON.stringify(data));

    setReviewersToChoose(data);
    setReviewer(data[0]);
  }
};
