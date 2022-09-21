import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUserSuccess, loadUserFailure, loadReviewerSuccess, loadReviewerFailure} from '../store/actions';
import User from './User';

const BASE_URL = 'https://api.github.com';

function getRequest(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        if (response.status == 404) {
          throw Error('Not found');
        }
        throw Error('Request error');
      }
      return response.json()
    });
}

function chooseReviewer(contributors, blackList = []) {
  const filtered = contributors.filter(({login}) => !blackList.includes(login));
  const choosen = filtered[Math.floor(Math.random() * filtered.length)];
  if (!choosen) {
    throw Error('Reviewer not found');
  }
  return choosen;
}

function fetchUser(login) {
  return function(dispatch, getState) {
    return getRequest(`${BASE_URL}/users/${login}`)
      .then(user => dispatch(loadUserSuccess(user)))
      .catch(({message}) => dispatch(loadUserFailure(message)));
  }
}

function findReviewer(repo, blackList) {
  return function(dispatch, getState) {
    return getRequest(`${BASE_URL}/repos/${repo}/contributors`)
      .then(contributors => {
        const choosen = chooseReviewer(contributors, blackList)
        dispatch(loadReviewerSuccess(choosen));
      })
      .catch(({message}) => dispatch(loadReviewerFailure(message)));
  }
}

export default function ReviewerFinder(props) {
  const dispatch = useDispatch();
  const {settings, user, reviewer} = useSelector(state => state);

  const onFindHandler = () => {
    dispatch(findReviewer(settings.repo, [settings.login, ...settings.blackList]));
  }

  useEffect(() => {
    const login = settings.login;
    if (!login) {
      return;
    }
    dispatch(fetchUser(login));
  }, [settings.login]);

  return (
    <div>
      <div>
        Git Login: {settings.login}
      </div>
      <div>
        <button onClick={onFindHandler}>Find reviewer</button>
        <User user={reviewer} title="Reviewer" />
        <User user={user} title="Git user" />
      </div>
    </div>);
}
