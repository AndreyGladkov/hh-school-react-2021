import React, {useContext, useState} from 'react'
import {fetchWithError} from '../util/fetchWithErrorHandling'
import {UserContext} from "../context/UserContext";
import { RepoContext } from '../context/RepoContext';

import "../../styles/styles.css"

const SelectUserComponent = () => {

    const { githubUserData, dispatchGithubUserData } = useContext(UserContext);
    const { dispatchSelectedRepo } = useContext(RepoContext);

    const [githubUser, setGithubUser] = useState();

    const valideUserInput = (githubUser) => {
        if (githubUser === null || githubUser === "" || 
            (githubUserData !== null && githubUser === githubUserData.login)
        ) {return false;}
        return true;
    }

    async function fetchUserDataAsync() {
        if (!valideUserInput(githubUser)) return;
        dispatchSelectedRepo({type: "CLEAR"});
        const userData = 
            await fetchWithError("https://api.github.com/users/" + githubUser)
                    .catch(() => dispatchGithubUserData({type: "ERROR", error: "Unknown login"}));
        if (userData) {
            const reposData =  
                await fetchWithError(userData.repos_url + "?per_page=100")
                            .catch(error => console.log(error.message));
            dispatchGithubUserData({type: "FETCH_USER", user: userData, repos: reposData});
        }
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            <h3 className = "subTitle">User github login</h3>
            <input type = "text" onChange = {(event) => setGithubUser(event.target.value)} />
            <button type = "button"  onClick = {fetchUserDataAsync} className = "fetchUserBtn" >
                Fetch User Data
            </button>
            {<div style = {{color: "#fe8a71"}}>&#8203;{githubUser && githubUserData && githubUserData.error}</div>}
        </div>
    )
}

export default SelectUserComponent
