import React, {useState} from 'react'

import { useSelector, useDispatch } from "react-redux";
import { fetchRepoContributors, fetchRepoIfExists } from '../util/fetchRepoAsync';

const ManuallySelectRepositoryComponent = () => {

    const githubUserData = useSelector(state => state.githubUserData);
    const selectedRepo = useSelector(state => state.selectedRepo);
    const dispatch = useDispatch();

    const [repoName, setRepoName] = useState();

    async function fetchRepoData() {
        if (!repoName) return;
        dispatch(fetchRepoIfExists(githubUserData.user.login, repoName))
            .then(repo => dispatch(fetchRepoContributors(repo)))
                .then(() => console.log("asyncMiddleware"))
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
