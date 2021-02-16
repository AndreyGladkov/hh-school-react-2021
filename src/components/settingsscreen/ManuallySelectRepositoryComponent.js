import React, {useContext, useState} from 'react'
import { RepoContext } from '../context/RepoContext';
import { UserContext } from '../context/UserContext';
import { fetchWithError } from '../util/fetchWithErrorHandling';

const ManuallySelectRepositoryComponent = () => {

    const { githubUserData } = useContext(UserContext);
    const { dispatchSelectedRepo } = useContext(RepoContext);

    const [repoName, setRepoName] = useState();
    const [repoError, setRepoError] = useState();

    async function fetchRepoData() {
        if (!repoName) return;
        setRepoError();
        const repository = 
            await fetchWithError("https://api.github.com/repos/" + githubUserData.user.login + "/" + repoName)
                    .catch(() => setRepoError("Unknow repository"));
        if (repository) {
            const contributorsData =  
                await fetchWithError(repository.contributors_url)
                            .catch(error => console.log(error.message));
            dispatchSelectedRepo({type: "SELECT_REPO", repo: repository, contributors: contributorsData});
        }
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            <input type = "text" onChange = {(event) => setRepoName(event.target.value)} />
            <button type = "button"  onClick = {fetchRepoData} className = "fetchUserBtn" >
                Fetch Repo Data
            </button>
            {<div style = {{color: "#fe8a71"}}>&#8203;{repoError}</div>}
        </div>
    )
}

export default ManuallySelectRepositoryComponent
