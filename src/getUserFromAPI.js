const getUserFromAPI = (userName, setUser) => {
  console.log('getUser');

  if (!userName) {
    return;
  }

  fetch(`https://api.github.com/users/${userName}`)
    .then((response) => response.json())
    .then((data) => setUser(data))
    .catch((error) => console.error('ошибкя'));
};

export default getUserFromAPI;
