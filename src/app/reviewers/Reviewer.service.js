const getData = async (url, type, writeToHistory) => {
  const data =
    (await fetch(url)
      .then((r) => {
        writeToHistory(r);
        return r;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        return type;
      })) || [];

  if (!data.ok) return type;

  return (await data.json()) || type;
};

export const getRandomReviewer = (reviewerList, blocklist, setReviewer) => {
  const tempList = reviewerList;
  const tempBlocklist = blocklist;

  if (tempList.length === 0) {
    return { name: '', avatar_url: '' };
  }

  const filteredReviewerList = tempList.filter(
    (filteredReviewers) => !tempBlocklist.includes(filteredReviewers.login),
  );

  const randomReviewer =
    filteredReviewerList[
      Math.floor(Math.random() * filteredReviewerList.length)
    ];

  return setReviewer(randomReviewer || {});
};

export default getData;
