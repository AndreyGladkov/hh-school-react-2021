import React from 'react'

import { useSelector, useDispatch } from "react-redux";
import { fetchGivenRepoData } from '../util/fetchRepoAsync';

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
        const repo = getSelectedRepoFromList(repoName)
        dispatch(fetchGivenRepoData(repo))
            .then(() => console.log("asyncMiddleware"))
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
