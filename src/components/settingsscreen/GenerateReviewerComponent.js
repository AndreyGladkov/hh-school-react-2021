import React, { useState, useEffect, useContext } from 'react'
import { BlackListContext } from '../context/BlackListContext';
import { RepoContext } from '../context/RepoContext';
import { useSelector, useDispatch } from "react-redux";

import "../../styles/styles.css"

const GenerateReviewerComponent = () => {

    const { selectedRepo, dispatchSelectedRepo } = useContext(RepoContext);
    const { blacklist } = useContext(BlackListContext);

    const [selectedRepoState, blacklistState] = useSelector((state) => [state.selectedRepo, state.blacklist]);
    const dispatch = useDispatch();

    const [potentialReviewers, setPotentialReviewers] = useState();

    useEffect(() => {
        console.log("Selcted repo state: ", selectedRepoState)
        console.log("BlacklistState: ", blacklistState)
    }, [selectedRepoState, blacklistState])

    useEffect(() => {
        if (!selectedRepo || !selectedRepo.contributors) return;
        const reviewers =  selectedRepo.contributors.filter(contributor => 
            (!blacklist.map(item => item.toLowerCase()).includes(contributor.login.toLowerCase()) 
                && contributor.login !== selectedRepo.repo.owner.login));
        setPotentialReviewers(reviewers);
    }, [selectedRepo, blacklist])

    const generateReviewer = () => {
        const randomIndex = Math.floor(Math.random()*potentialReviewers.length);
        dispatchSelectedRepo({type: "SELECT_REVIEWER", reviewer: potentialReviewers[randomIndex]});
    }

    if (!selectedRepo || !selectedRepo.contributors) {
        return null;
    }

    if (!potentialReviewers || potentialReviewers.length === 0) {
        return <div className = "generateReviewersDiv" style = {{color: "#fe8a71", fontSize: "20px"}}>No potential reviewers for this repository</div>
    }

    return (
        <div className = "generateReviewersDiv">
            <button type = "button" className = "generateBtn" onClick = {generateReviewer}>Generate reviewer</button>
        </div>
    )
}

export default GenerateReviewerComponent
