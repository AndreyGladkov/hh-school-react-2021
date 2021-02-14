import React, {useState, useContext, useEffect} from 'react'
import useFetchWithErrorHandling from './useFetchWithErrorHandling'
import {UserContext, UserReposContext } from "./context/UserContext";


const FetchGithubUserByLogin = () => {

    const {githubUserData, setGithubUserData} = useContext(UserContext);
    const {githubUserRepos} = useContext(UserReposContext);

    const [githubUser, setGithubUser] = useState();
    const [githubUserUrl, setGithubUserUrl] = useState();
    const [fetchedGithubUserData, githubUserError] = useFetchWithErrorHandling(githubUserUrl)
    
    const [repoContributorsUrl, setRepoContributorsUrl] = useState()
    const [repoContributors, repoContributorError] = useFetchWithErrorHandling(repoContributorsUrl)

    const setSelectedRepo = (repoName) => {
        setRepoContributorsUrl(`https://api.github.com/repos/${fetchedGithubUserData.login}/${repoName}/contributors`)
    }

    useEffect(() => {
        if (fetchedGithubUserData == null) return;
        setGithubUserData(fetchedGithubUserData);
    }, [fetchedGithubUserData])

    useEffect(() => {
        if (githubUserRepos == null) return;
        console.log(githubUserRepos)
    }, [githubUserRepos])

    useEffect(() => {
        console.log(repoContributors)
    }, [repoContributors])

    return (
        <div>
            <div>User github login: </div>
            <input type = "text" onChange = {(event) => setGithubUser(event.target.value)} />
            <button type = "button" onClick = {() => setGithubUserUrl("https://api.github.com/users/" + githubUser)}>Fetch User Data</button>
            {githubUserData && githubUserData.login &&
                <div>
                    <p>{githubUserData.login}</p>
                    <img alt = "user_avatar" src = {githubUserData.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }
            {githubUserRepos &&
            <select onChange = {(event) => setSelectedRepo(event.currentTarget.value)}>
                <option value = ""></option>
                {githubUserRepos.map(repo => {
                    return (<option key = {repo.name} value = {repo.name}>{repo.name}</option>)   
                })}
            </select>}

            {githubUserError && <div>User with such login does not exist</div>}
        </div>
    )
}

export default FetchGithubUserByLogin
