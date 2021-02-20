import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../styles/styles.css";
import { selectReviewer } from "../reducers/selectedRepoReducer";

const GenerateReviewerComponent = () => {
    const blacklist = useSelector((state) => state.blacklist);
    const selectedRepo = useSelector((state) => state.selectedRepo);
    const dispatch = useDispatch();

    const [potentialReviewers, setPotentialReviewers] = useState();

    useEffect(() => {
        if (!!selectedRepo?.contributors) {
            const reviewers = selectedRepo.contributors.filter(
                (contributor) =>
                    !blacklist
                        .map((item) => item.toLowerCase())
                        .includes(contributor.login.toLowerCase()) &&
                    contributor.login !== selectedRepo.repo.owner.login
            );
            setPotentialReviewers(reviewers);
        }
    }, [selectedRepo, blacklist]);

    const generateReviewer = () => {
        const randomIndex = Math.floor(
            Math.random() * potentialReviewers.length
        );
        dispatch(selectReviewer(potentialReviewers[randomIndex]));
    };

    if (
        !selectedRepo ||
        Object.keys(selectedRepo.repo).length === 0 ||
        !selectedRepo.contributors
    ) {
        return null;
    }

    if (!potentialReviewers || potentialReviewers.length === 0) {
        return (
            <div
                className="generateReviewersDiv"
                style={{ color: "#fe8a71", fontSize: "20px" }}
            >
                No potential reviewers for this repository
            </div>
        );
    }

    return (
        <div className="generateReviewersDiv">
            <button
                type="button"
                className="generateBtn"
                onClick={generateReviewer}
            >
                Generate reviewer
            </button>
        </div>
    );
};

export default GenerateReviewerComponent;
