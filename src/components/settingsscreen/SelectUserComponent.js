import React, {useState} from 'react'
import {fetchWithError} from '../util/fetchWithErrorHandling'

import { useSelector, useDispatch } from "react-redux";

import "../../styles/styles.css"

const SelectUserComponent = () => {

    const githubUserData = useSelector(state => state.githubUserData);
    const dispatch = useDispatch();

    const [githubUser, setGithubUser] = useState();

    const valideUserInput = (githubUser) => {
        return githubUser && githubUser.toLowerCase() !== githubUserData?.user?.login.toLowerCase();
    }

    async function fetchUserDataAsync() {
        if (!valideUserInput(githubUser)) return;
        dispatch({type: "REPO_CLEAR"});
        const userData = 
            await fetchWithError("https://api.github.com/users/" + githubUser)
                    .catch(() => {
                        dispatch({type: "USER_ERROR", payload: {error: "Unknown login"}})
                    });
        if (userData) {
            const reposData =  
                await fetchWithError(userData.repos_url + "?per_page=100")
                            .catch(error => console.log(error.message));
            dispatch({type: "FETCH_USER", payload: {user: userData, repos: reposData}})
        }
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            <h3 className = "subTitle">User github login</h3>
            <input type = "text" onChange = {(event) => setGithubUser(event.target.value)} />
            <button type = "button"  onClick = {fetchUserDataAsync} className = "fetchUserBtn" >
                Fetch User Data
            </button>
            {<div style = {{color: "#fe8a71"}}>&#8203;{githubUser && githubUserData?.error}</div>}
        </div>
    )
}

export default SelectUserComponent
