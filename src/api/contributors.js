// /repos/:owner/:repo/contributors
export async function getContributors(repo) {
    let rp = repo.replace('https://github.com/','');
    try {
        const response = await fetch(`https://api.github.com/repos/${rp}/contributors`);
        return response.ok ? await response.json() : [];
    } catch (Exception) {
        console.log(Exception);
        return [];
    }
}

export const REQUEST_USERS = 'REQUEST_USERS'
export function requesUsers(repo) {
  return {
    type: REQUEST_USERS,
    repo
  }
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
function receiveUsers(repo, json) {
  return {
    type: RECEIVE_USERS,
    repo,
    users: json
  }
}

export const INVALIDATE_USERS = 'INVALIDATE_USERS'
export function invalidateUsers(repo) {
  return {
    type: INVALIDATE_USERS,
    repo
  }
}
export function fetchUsers(repo) {
    let rp = repo.replace('https://github.com/','');
    return function (dispatch) {
      dispatch(requesUsers(repo))
  
      return fetch(`https://api.github.com/repos/${rp}/contributors`)
        .then(
          response => response.json(),
          error => console.log('An error occurred.', error)
        )
        .then(json =>
          dispatch(receiveUsers(repo, json))
        )
    }
  }