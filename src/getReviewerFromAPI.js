const getReviewerFromAPI = (
  settings,
  setReviewer,
  setReviewersToChoose,
  setBlacklisted
) => {
  console.log('getReviewer');

  const blacklist = settings.blacklist.split(',');

  console.log(blacklist);

  fetch(
    `https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`
  )
    .then((response) => response.json())
    .then((data) => ReviewerHandler(data))
    .catch((error) => console.error(error));

  function ReviewerHandler(data) {
    const filtered = data.filter((user) => !blacklist.includes(user.login));
    const blacklisted = data.filter((user) => blacklist.includes(user.login));
    setReviewersToChoose(filtered);
    setBlacklisted(blacklisted);

    setReviewer(filtered[Math.floor(Math.random() * (filtered.length - 1))]);
  }
};

export default getReviewerFromAPI;
