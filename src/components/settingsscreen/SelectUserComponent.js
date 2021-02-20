import React, {useState, useEffect} from 'react'
import {fetchWithError} from '../util/fetchWithErrorHandling'

import { useSelector, useDispatch } from "react-redux";

import "../../styles/styles.css"

const SelectUserComponent = () => {

    const githubUserData = useSelector(state => state.githubUserData);
    const dispatch = useDispatch();

    const [githubUser, setGithubUser] = useState();

    const valideUserInput = (githubUser) => {
        if (githubUser === null || githubUser === "" || 
            (githubUserData !== null && githubUser === githubUserData.login)
        ) {return false;}
        return true;
    }

    useEffect(() => {
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData))
    }, [githubUserData])

    async function fetchUserDataAsync() {
        if (!valideUserInput(githubUser)) return;
        dispatch({type: "CLEAR"});
        const userData = 
            await fetchWithError("https://api.github.com/users/" + githubUser)
                    .catch(() => {
                        dispatch({type: "ERROR", payload: {error: "Unknown login"}})
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
