import React, {useState, useContext} from 'react'
import {fetchWithError} from './useFetchWithErrorHandling'
import {UserContext, UserReposContext } from "./context/UserContext";
import { BlackListContext } from './context/BlackListContext';
import SelectRepositoryComponent from './SelectRepositoryComponent';


const FetchGithubUserByLogin = () => {

    const { githubUserData, setGithubUserData } = useContext(UserContext);
    const { githubUserRepos, setGithubUserRepos } = useContext(UserReposContext);
    const { blacklist } = useContext(BlackListContext);

    const [loginError, setLoignError] = useState();
    const [githubUser, setGithubUser] = useState();

    const [reviewerError, setReviewerError] = useState();
    const [reviewer, setReviewer] = useState();
    
    const [repoContributors, setRepoContributors] = useState()

    const valideUserInput = (githubUser) => {
        if (githubUser === null || githubUser === "" || 
            (githubUserData !== null && githubUser === githubUserData.login)
        ) {return false;}
        return true;
    }

    const fetchGithubUserData = () => {
        if (!valideUserInput(githubUser)) return;
        console.log("fetch user data")
        fetchWithError("https://api.github.com/users/" + githubUser)
            .then(userData => {
                    setGithubUserData(userData);
                    fetchGithubUserRepos(userData.login);
                    setRepoContributors();
                    setLoignError();
                })
                .catch(() => {
                    setLoignError("Unknown login");
                    setGithubUserData();
                });
    }

    const fetchGithubUserRepos = (login) => {
        console.log("fetch user repo")
        fetchWithError("https://api.github.com/users/" + login + "/repos?per_page=100")
                .then(data => setGithubUserRepos(data))
                    .catch(error => console.log(error.message))
    }

    const fetchRepoContributors = (repoName) => {
        console.log("fetch repo contributors")
        fetchWithError(`https://api.github.com/repos/${githubUserData.login}/${repoName}/contributors`)
            .then(data => setRepoContributors(data))
                .catch((error) => console.log(error.message))
    }

    const generateReviewer = () => {
        const potentialReviewers =  repoContributors.filter(contributer => 
            (!blacklist.includes(contributer.login) && contributer !== githubUserData.login))
        if (potentialReviewers === null || potentialReviewers.length === 0) {
            setReviewerError("No potential reviewers for this repository");
            setReviewer();
        } else {
            const randomIndex = Math.floor(Math.random()*potentialReviewers.length);
            setReviewer(potentialReviewers[randomIndex]);
            setReviewerError();
        }
    }

    return (
        <div>
            <div>User github login: </div>
            <input type = "text" onChange = {(event) => setGithubUser(event.target.value)} />
            <button type = "button" onClick = {fetchGithubUserData}>Fetch User Data</button>
            
            {githubUserRepos &&
            <select onChange = {(event) => fetchRepoContributors(event.currentTarget.value)}>
                <option value = ""></option>
                {githubUserRepos.map(repo => {
                    return (<option key = {repo.name} value = {repo.name}>{repo.name}</option>)   
                })}
            </select>}

            {<div>{loginError}</div>}
            {repoContributors && <button type = "button" onClick = {generateReviewer}>Generate random reviewer</button>}
            {<div>{reviewerError}</div>}
            {reviewer && 
                <div>
                    <p>{reviewer.login}</p>
                    <img alt = "user_avatar" src = {reviewer.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }

            <SelectRepositoryComponent />

        </div>
    )
}

export default FetchGithubUserByLogin
