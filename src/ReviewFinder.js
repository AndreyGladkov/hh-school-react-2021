import React, {useState} from 'react';
import Reviewer from './Reviewer';

const BASE_URL = 'https://api.github.com';

async function findContributors(repo) {
  const response = await fetch(`${BASE_URL}/repos/${repo}/contributors`);
  if (!response.ok) {
    throw Error('Request repo contriubors error');
  }
  return await response.json();
}

async function findUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    throw Error('Request user contriubors error');
  }
  const user = await response.json();
  console.log(user);
  return user;
}

function chooseReviewer(contributors, blackList = []) {
  const filtered = contributors.filter(({login}) => !blackList.includes(login));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

function ReviewerFinder(props) {
  const [reviewer, setReviewer] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const onFindHandler = async () => {
    try {
      const reviewer = (await findContributors(props.settings.repo));
      const choosen = chooseReviewer(reviewer, [props.settings.login, ...props.settings.blackList]);
      const user = await findUser(props.settings.login);
      setReviewer(choosen);
      setUser(user);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  }

  const errorStyle = {color: 'red'};

  return (
    <div>
      <div>
        Git Login: {props.settings.login}
      </div>
      <div>
        <button onClick={onFindHandler}>{reviewer ? "Refind" : "Find"} reviewer</button>
        {!error ?
          reviewer && user && <div>
          <div>
            <h2>Reviewer</h2>
            <Reviewer reviewer={reviewer} />
          </div>
          <div>
            <h2>Git user</h2>
            <Reviewer reviewer={user} />
          </div>
        </div> :
          <div style={errorStyle}>{error}</div>
        }
      </div>
    </div>);
}

export default ReviewerFinder;
