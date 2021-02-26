import React, {useState, useEffect} from 'react';
import User from './User';

const BASE_URL = 'https://api.github.com';

async function getRequest(url) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status == 404) {
      throw Error('Not found');
    }
    throw Error('Request error');
  }
  return await response.json();
}

function chooseReviewer(contributors, blackList = []) {
  const filtered = contributors.filter(({login}) => !blackList.includes(login));
  const choosen = filtered[Math.floor(Math.random() * filtered.length)];
  if (!choosen) {
    throw Error('Reviewer not found');
  }
  return choosen;
}

function ReviewerFinder(props) {
  const [reviewer, setReviewer] = useState(null);
  const [reviewerError, setReviewerError] = useState(null);
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);

  const onFindHandler = async () => {
    console.log('find');
    try {
      const reviewer = (await getRequest(`${BASE_URL}/repos/${props.settings.repo}/contributors`));
      const choosen = chooseReviewer(reviewer, [props.settings.login, ...props.settings.blackList]);
      setReviewer(choosen);
      setReviewerError(null);
    } catch (error) {
      setReviewerError(error.message);
    }
  }

  useEffect(async () => {
    if (!props.settings.login) {
      return;
    }
    try {
      const user = await getRequest(`${BASE_URL}/users/${props.settings.login}`);
      setUser(user);
      setUserError(null);
    } catch (error) {
      console.error('error');
      setUserError(error.message)
    }
  }, [props.settings.login]);

  return (
    <div>
      <div>
        Git Login: {props.settings.login}
      </div>
      <div>
        <button onClick={onFindHandler}>{reviewer ? "Refind" : "Find"} reviewer</button>
        <User user={reviewer} title="Reviewer" error={reviewerError} />
        <User user={user} title="Git user" error={userError} />
      </div>
    </div>);
}

export default ReviewerFinder;
