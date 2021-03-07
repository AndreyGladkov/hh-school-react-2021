import React, {useEffect} from 'react';
import {connect, useDispatch} from "react-redux";
import {loadUserSuccess, loadUserFailure} from './models/user';
import {loadReviewerSuccess, loadReviewerFailure} from './models/reviewer';
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

function ReviewerFinder(props) {
  const dispatch = useDispatch();

  const onFindHandler = () => {
    dispatch(findReviewer(props.settings.repo, [props.settings.login, ...props.settings.blackList]));
  }

  useEffect(() => {
    const login = props.settings.login;
    if (!login) {
      return;
    }
    dispatch(fetchUser(login));
  }, [props.settings.login]);

  return (
    <div>
      <div>
        Git Login: {props.settings.login}
      </div>
      <div>
        <button onClick={onFindHandler}>Find reviewer</button>
        <User user={props.reviewer} title="Reviewer" />
        <User user={props.user} title="Git user" />
      </div>
    </div>);
}

export default connect(
  state => state,
  {
    loadUserFailure, loadUserSuccess,
    loadReviewerFailure, loadReviewerSuccess
  }
)(ReviewerFinder);
