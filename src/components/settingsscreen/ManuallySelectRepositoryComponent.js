import React, {useState} from 'react'
import { fetchWithError } from '../util/fetchWithErrorHandling';

import { useSelector, useDispatch } from "react-redux";

const ManuallySelectRepositoryComponent = () => {

    const githubUserData = useSelector(state => state.githubUserData);
    const selectedRepo = useSelector(state => state.selectedRepo);
    const dispatch = useDispatch();

    const [repoName, setRepoName] = useState();

    async function fetchRepoData() {
        if (!repoName) return;
        const repository = 
            await fetchWithError("https://api.github.com/repos/" + githubUserData.user.login + "/" + repoName)
                    .catch(() => dispatch({type: "REPO_ERROR"}));
        if (repository) {
            const contributorsData =  
                await fetchWithError(repository.contributors_url)
                            .catch(error => console.log(error.message));
            dispatch({type: "SELECT_REPO", payload: {repo: repository, contributors: contributorsData}});
        }
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            <input type = "text" onChange = {(event) => setRepoName(event.target.value)} />
            <button type = "button"  onClick = {fetchRepoData} className = "fetchUserBtn" >
                Fetch Repo Data
            </button>
            {<div style = {{color: "#fe8a71"}}>&#8203;{selectedRepo.error}</div>}
        </div>
    )
}

export default ManuallySelectRepositoryComponent
