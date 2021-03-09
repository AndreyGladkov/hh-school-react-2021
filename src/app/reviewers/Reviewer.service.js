// import EmptyData from './assets/emptydata.constants';

const getData = async (url, type) => {
  // if (!url) return {};

  const data =
    (await fetch(url)
      .then((r) => r)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        return type;
      })) || [];

  if (!data.ok) return type;

  return (await data.json()) || type;
};

export default getData;
