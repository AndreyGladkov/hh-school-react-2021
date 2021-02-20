import React from 'react'
import { fetchWithError } from '../util/fetchWithErrorHandling';

import { useSelector, useDispatch } from "react-redux";

const SelectFromGivenReposComponent = () => {

    const githubUserData = useSelector(state => state.githubUserData);
    const selectedRepo = useSelector(state => state.selectedRepo);
    const dispatch = useDispatch();

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
                dispatch({type: "SELECT_REPO", payload: {repo: repository, contributors: contributorsData}})
            })
                .catch((error) => console.log(error.message))
    }

    return (
        <div style = {{color: "#4a4e4d", marginBottom: "20px"}}>
            {!!githubUserData?.repos && (
            <select value = {selectedRepo.repo.name} onChange = {(event) => updateSelectedRepo(event.currentTarget.value)}>
                <option value = ""></option>
                {githubUserData.repos.map((repository) => {
                    return (
                        <option key = {repository.name} value = {repository.name} >{repository.name}</option>)   
                })}
            </select>)}
        </div>
    )
}

export default SelectFromGivenReposComponent
