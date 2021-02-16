import React, {useContext} from 'react'
import { RepoContext } from '../context/RepoContext';
import { UserContext } from '../context/UserContext';
import { fetchWithError } from '../util/fetchWithErrorHandling';

const SelectFromGivenReposComponent = () => {

    const { githubUserData } = useContext(UserContext);
    const { selectedRepo, dispatchSelectedRepo } = useContext(RepoContext);

    const getSelectedRepoFromList = (repoName) => {
        return githubUserData.repos.reduce((prevRepository, repository) => {
            if (repository.name === repoName)
                return repository;
            return prevRepository;
        })
    }

    const updateSelectedRepo = (repoName) => {
        const repository = getSelectedRepoFromList(repoName)
        fetchWithError(repository.contributors_url)
            .then(contributorsData => {
                dispatchSelectedRepo({type: "SELECT_REPO", repo: repository, contributors: contributorsData})
            })
                .catch((error) => console.log(error.message))
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            {githubUserData.repos &&
            <select value = {selectedRepo.repo.name} onChange = {(event) => updateSelectedRepo(event.currentTarget.value)}>
                <option value = ""></option>
                {githubUserData.repos.map((repository) => {
                    return (
                        <option key = {repository.name} value = {repository.name} >{repository.name}</option>)   
                })}
            </select>}
        </div>
    )
}

export default SelectFromGivenReposComponent
