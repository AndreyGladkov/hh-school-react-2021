const getData = async (url) => {
  // if (!url) return {};

  const data =
    (await fetch(url)
      .then((r) => r)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        return [];
      })) || [];

  if (data.status === 404)
    return {
      name: 'Not found',
      avatar_url:
        'https://t3.ftcdn.net/jpg/03/04/15/80/360_F_304158083_1e8r6OBpvBTUph5BPsHNw48MIVkw1Vpt.jpg', // Вообще, конечно, картинки так хранить нельзя
    };

  return (await data.json()) || {};
};

export default getData;
