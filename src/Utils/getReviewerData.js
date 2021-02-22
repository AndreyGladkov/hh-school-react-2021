function getReviewerData(settings, setReviewer) {
  if (!settings.login || !settings.repo) {
    return;
  }
  fetch(`https://api.github.com/repos/${settings.login}/${settings.repo}/contributors`)
    .then((response) => response.json())
    .then((data) => {
      console.log('fetch contributors', data)
      if (!data?.length > 0) {
        setReviewer(null);
        return;
      }
      const filtered = data
        .filter(item => !settings.blackList
          .split(',').map(blackItem => blackItem.trim())
          .includes(item.login)
        )
      if (filtered && filtered.length > 0) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        setReviewer(filtered[randomIndex]);
      } else {
        setReviewer(null);
      }
    })
    .catch((error) => console.error(error));
}

export default getReviewerData;
  