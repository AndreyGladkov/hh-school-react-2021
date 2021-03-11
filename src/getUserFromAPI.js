import React, { useEffect, useState } from 'react';

export default (userName) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userName || user?.login === userName) {
      return;
    }

    fetch(`https://api.github.com/users/${userName}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [userName, user]);

  return user;
};
