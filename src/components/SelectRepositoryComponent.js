import React, {useContext, useEffect} from 'react'
import { RepoContext } from './context/RepoContext';
import { UserReposContext, UserContext } from './context/UserContext';
import { fetchWithError } from './useFetchWithErrorHandling';

const SelectRepositoryComponent = () => {

    const { githubUserRepos } = useContext(UserReposContext);
    const { githubUserData } = useContext(UserContext);
    const { selectedRepo, dispatchSelectedRepo } = useContext(RepoContext);

    const getSelectedRepoFromList = (repoName) => {
        return githubUserRepos.reduce((prevRepository, repository) => {
            if (repository.name === repoName)
                return repository;
            return prevRepository;
        })
    }

    const updateSelectedRepo = (repoName) => {
        const repository = getSelectedRepoFromList(repoName)
        fetchWithError(`https://api.github.com/repos/${githubUserData.login}/${repository.name}/contributors`)
            .then(contributorsData => {
                dispatchSelectedRepo({type: "UPDATE", repo: repository, contributors: contributorsData})
            })
                .catch((error) => console.log(error.message))
    }

    return (
        <div>
            <div>Select repository for review</div>
            {githubUserRepos &&
            <select value = {selectedRepo.repo.name} onChange = {(event) => updateSelectedRepo(event.currentTarget.value)}>
                <option value = ""></option>
                {githubUserRepos.map((repository) => {
                    return (
                        <option key = {repository.name} value = {repository.name} >{repository.name}</option>)   
                })}
            </select>}
        </div>
    )
}

export default SelectRepositoryComponent
