import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {loadUserSuccess, loadUserFailure} from './models/user';
import {loadReviewerSuccess, loadReviewerFailure} from './models/reviewer';
import User from './User';

const BASE_URL = 'https://api.github.com';

async function getRequest(url) {
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

function ReviewerFinder(props) {
  const onFindHandler = () => {
    getRequest(`${BASE_URL}/repos/${props.settings.repo}/contributors`)
      .then(contributors => {
        const choosen = chooseReviewer(contributors, [props.settings.login, ...props.settings.blackList])
        props.loadReviewerSuccess(choosen);
      })
      .catch(error => props.loadReviewerFailure(error.message));
  }

  useEffect(() => {
    const login = props.settings.login;
    if (!login) {
      return;
    }

    getRequest(`${BASE_URL}/users/${login}`)
      .then(user => props.loadUserSuccess(user))
      .catch(error => {
        props.loadUserFailure(error.message)
      });
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
