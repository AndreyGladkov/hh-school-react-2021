import React, { useState } from "react";
import InputModalWindow from "../InputModalWindow";
import CustomButton from "../shared/CustomButton";
import Constants from "../Constants";
import "./styles.css";

const getInitialBlackListValue = () => JSON.parse(localStorage.getItem("blackList")) || [];
const getInitialBlackListVisibilityValue = () => JSON.parse(localStorage.getItem("blackListIsVisible")) || false;

const BlackList = () => {
    const [blackList, setBlackList] = useState(getInitialBlackListValue());
    const [blackListIsVisible, setBlackListVisibility] = useState(getInitialBlackListVisibilityValue());
    const [blackListModalIsVisible, setBlackListModalVisibility] = useState(false);
    const [blackListModalError, setBlackListModalError] = useState("");

    const setBlackListValue = (value, operationType) => {
        if (value === "") {
            setBlackListModalError("Username can not be empty");
            return;
        }
        if (operationType === "add" && blackList.indexOf(value) !== -1) {
            setBlackListModalError("User is already in blacklist");
            return;
        }
        const updatedBlackList = operationType === "remove"
            ? blackList.filter(blackListItem => blackListItem !== value)
            : [...blackList, value];

        localStorage.setItem("blackList", JSON.stringify(updatedBlackList));
        setBlackList(updatedBlackList);
    };

    const toggleBlackListVisibility = () => {
        const updatedBlackListVisibility = !blackListIsVisible;

        localStorage.setItem("blackListIsVisible", JSON.stringify(updatedBlackListVisibility));
        setBlackListVisibility(updatedBlackListVisibility);
    };

    const toggleBlackListModalVisibility = event => {
        event.preventDefault();
        setBlackListModalVisibility(!blackListModalIsVisible);
    };

    return (
        <React.Fragment>
            <div className={"black-list__caption"}>
                {blackList.length
                    ? (
                        <div className={"black-list__users-button"} onClick={toggleBlackListVisibility}>
                            {"Blacklisted reviewers"}
                            <div className={`black-list__${blackListIsVisible ? "hide" : "show"}-users-arrow`} />
                        </div>
                    ) : "Blacklist is empty"}
            </div>
            {blackListIsVisible && blackList.map(blackListItem => (
                <div className={"black-list__item"} key={blackListItem}>
                    <a className={"black-list__item-name"} href={`${Constants.GITHUB_BASE_URL}/${blackListItem}`}>
                        {blackListItem}
                    </a>
                    <button
                        className={"black-list__item-button"}
                        onClick={() => setBlackListValue(blackListItem, "remove")}
                    >
                        ❌
                    </button>
                </div>
            ))}
            <CustomButton onClick={toggleBlackListModalVisibility} buttonstyle={"outlined"} buttontype={"default"}>
                Add GitHub users to blacklist
            </CustomButton>
            {blackListModalIsVisible && (
                <InputModalWindow
                    closeModal={toggleBlackListModalVisibility}
                    useModalValue={value => setBlackListValue(value, "add")}
                    inputPlaceholder={"GitHub login"}
                    submitButtonName={"Add user to reviewers blacklist"}
                    errorMessage={blackListModalError}
                    clearErrorMessage={() => setBlackListModalError("")}
                />
            )}
        </React.Fragment>
    );
};

export default BlackList;
