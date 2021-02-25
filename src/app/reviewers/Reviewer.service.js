const getData = async (url) => {
  // if (!url) return {};

  const data =
    (await fetch(url)
      .then((r) => r.json())
      .catch((error) => {
        console.error(error);
        return [];
      })) || [];

  return data || {};
};

export default getData;
