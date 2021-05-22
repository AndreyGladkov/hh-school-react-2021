import React, { useState } from "react";
import BlackList from "../BlackList";
import UserCard from "../UserCard";
import Api from "../../api/index.js";
import CustomButton from "../shared/CustomButton";
import CustomInput from "../shared/CustomInput";
import "./styles.css";

const getInitialStringValue = (key) => (localStorage.getItem(key) || "");
const getInitialBooleanValue = (key) => (localStorage.getItem(key) === "true" || false);
const getInitialUserItemValue = (user) => (JSON.parse(localStorage.getItem(user)) || { image: "", login: "" });

const Settings = () => {
    const [settingsAreVisible, toggleSettingsVisibility] = useState(getInitialBooleanValue("settingsAreVisible"));
    const [gitHubLogin, setGitHubLogin] = useState(getInitialStringValue("gitHubLogin"));
    const [gitHubRepository, setGitHubRepository] = useState(getInitialStringValue("gitHubRepository"));
    const [reviewee, setReviewee] = useState(getInitialUserItemValue("reviewee"));
    const [reviewer, setReviewer] = useState(getInitialUserItemValue("reviewer"));
    const [loginError, setLoginError] = useState("");
    const [repositoryError, setRepositoryError] = useState("");
    const [requestError, setRequestError] = useState("");
    const [requestIsInProcess, setRequestState] = useState(false);
    const [userHasContributions, setUserHasContributions] = useState(getInitialBooleanValue("userHasContributions"));

    const apiRateLimitError = "API rate limit exceeded";

    const toggleSettingsVisibilityValue = () => {
        const newValue = !settingsAreVisible;

        localStorage.setItem("settingsAreVisible", newValue);
        toggleSettingsVisibility(newValue);
    };

    const setValue = (value, valueName, set) => {
        localStorage.setItem(
            valueName,
            typeof value === "string" ? value : JSON.stringify(value)
        );
        set(value);
    };

    const clearErrorMessages = () => {
        setLoginError("");
        setRepositoryError("");
        setRequestError("");
    };

    const formHasNoErrorMessages = () => (
        !loginError.length && !repositoryError.length && !requestError.length
    );

    const clearResult = () => {
        setValue({ image: "", login: "" }, "reviewee", setReviewee);
        setValue({ image: "", login: "" }, "reviewer", setReviewer);
    };

    const apiRateLimitExceeded = (response, data) => (
        response.status === 403 &&
        data.message &&
        data.message.indexOf(apiRateLimitError) > -1
    );

    const processUserDataResponse = (response) => (
        response.json().then((responseJson) => {
            if (response.status >= 200 && response.status < 300) {
                setValue({ image: responseJson.avatar_url, login: responseJson.login }, "reviewee", setReviewee);
            } else if (apiRateLimitExceeded(response, responseJson)) {
                setLoginError(apiRateLimitError);
            } else {
                setLoginError('Print login, for example "console1928"');
            }
        })
    );

    const setUserContributions = (contributors) => {
        setValue(false, "userHasContributions", setUserHasContributions);

        for (const contributor of contributors) {
            if (contributor.login === gitHubLogin) {
                setValue(true, "userHasContributions", setUserHasContributions);
            }
        }
    };

    const processContributorsResponse = (response) => (
        response.json().then((responseJson) => {
            if (response.status >= 200 && response.status < 300) {
                const blackList = JSON.parse(localStorage.getItem("blackList")) || [];
                const filteredResponse = responseJson.filter(
                    contributor => (
                        contributor.login !== gitHubLogin &&
                        blackList.indexOf(contributor.login) === -1
                    )
                );

                setUserContributions(responseJson);

                if (filteredResponse.length) {
                    const responseRandomReviewer =
                        filteredResponse[Math.floor(Math.random() * filteredResponse.length)];

                    setValue(
                        { image: responseRandomReviewer.avatar_url, login: responseRandomReviewer.login },
                        "reviewer",
                        setReviewer
                    );
                }
            } else if (apiRateLimitExceeded(response, responseJson)) {
                setRepositoryError(apiRateLimitError);
            } else {
                setRepositoryError('Print repository address, for example "https://github.com/console1928/example"');
            }
        })
    );

    const generateReviewer = (event) => {
        event.preventDefault();
        clearErrorMessages();
        clearResult();
        if (gitHubLogin === "") {
            setLoginError("This field should not be empty");
            return;
        }
        if (gitHubRepository === "") {
            setRepositoryError("This field should not be empty");
            return;
        }
        setRequestState(true);
        Promise.all([
            Api.getUserData(gitHubLogin),
            Api.getRepositoryContributors(gitHubRepository)
        ])
            .then(([currentUser, contributors]) => {
                processUserDataResponse(currentUser)
                    .then(() => processContributorsResponse(contributors))
                    .then();
            })
            .catch(() => {
                setRequestError("An error occured, check your internet connection");
            })
            .finally(() => {
                setRequestState(false);
            });
    };

    const renderUserHasNoContributions = () => (
        <div className={"settings__no-contributions"}>
            Current user has no contributions to this repository.
            Try changing GitHub login or GitHub repository.
        </div>
    );

    const renderUserHasContributions = () => (
        <React.Fragment>
            {reviewee.login && (
                <UserCard
                    login={reviewee.login}
                    image={reviewee.image}
                    caption={"Reviewee"}
                />
            )}
            {reviewer.login ? (
                <UserCard
                    login={reviewer.login}
                    image={reviewer.image}
                    caption={"Reviewer"}
                />
            ) : (
                    <div className={"settings__no-reviewer"}>No reviewer available</div>
                )}
        </React.Fragment>
    );

    const renderResult = () => {
        return (
            <div className={"settings__result"}>
                {userHasContributions ? renderUserHasContributions() : renderUserHasNoContributions()}
            </div>
        );
    };

    return (
        <div className={"settings"}>
            <CustomButton onClick={toggleSettingsVisibilityValue} buttonstyle={"outlined"} buttontype={"default"}>
                Settings
            </CustomButton>
            {settingsAreVisible && (
                <div className={"settings__content"}>
                    <form className={"settings__form"} onSubmit={generateReviewer}>
                        <CustomInput
                            type="text"
                            placeholder="GitHub login"
                            value={gitHubLogin}
                            onChange={event => setValue(event.target.value, "gitHubLogin", setGitHubLogin)}
                            errormessage={loginError}
                            disabled={requestIsInProcess}
                        />
                        <CustomInput
                            type="text"
                            placeholder="GitHub repository"
                            value={gitHubRepository}
                            onChange={event => setValue(event.target.value, "gitHubRepository", setGitHubRepository)}
                            errormessage={repositoryError}
                            disabled={requestIsInProcess}
                        />
                        <BlackList />
                        <CustomButton
                            type={"submit"}
                            buttonstyle={"filled"}
                            buttontype={"default"}
                            disabled={requestIsInProcess}
                        >
                            Generate reviewer
                        </CustomButton>
                        <div className={"settings__request-error"}>{requestError}</div>
                    </form>
                    {reviewee.login && formHasNoErrorMessages() && (
                        <React.Fragment>
                            {renderResult()}
                            <CustomButton onClick={clearResult} buttonstyle={"filled"} buttontype={"danger"}>
                                Clear Result
                            </CustomButton>
                        </React.Fragment>
                    )}
                </div>
            )}
        </div>
    );
};

export default Settings;
