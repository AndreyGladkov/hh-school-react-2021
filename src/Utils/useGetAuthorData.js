import { useEffect, useState } from "react";

function useGetAuthorData(settings) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (!settings.login || author?.login === settings.login) {
      return;
    }

    fetch(`https://api.github.com/users/${settings.login}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('fetch user', data)
        // если пришло что-то другое, то без проверки мы уйдем в бесконечный цикл обновлений
        if (data.login === settings.login) {
          setAuthor(data);
        } else {
          setAuthor(null);
        }
      })
      .catch((error) => console.error(error));
  }, [settings.login, author]);

  return author;
}

export default useGetAuthorData;
  