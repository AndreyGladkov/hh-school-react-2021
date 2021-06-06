import React, { useState, useCallback, useEffect, useRef } from "react";
import { connect } from "react-redux";
import BlackList from "../BlackList";
import UserCard from "../UserCard";
import { apiThunkCreators } from "../../store/reducers/api.js";
import CustomButton from "../shared/CustomButton";
import CustomInput from "../shared/CustomInput";
import "./styles.css";

const mapStateToProps = (state) => ({
    userData: state.reducersApi.userData,
    userDataJson: state.reducersApi.userDataJson,
    repositoryContributors: state.reducersApi.repositoryContributors,
    repositoryContributorsJson: state.reducersApi.repositoryContributorsJson
});

const mapDispatchToProps = (dispatch) => ({
    getUserData(userName) {
        dispatch(apiThunkCreators.getUserData(userName));
    },
    getRepositoryContributors(repositoryLink){
        dispatch(apiThunkCreators.getRepositoryContributors(repositoryLink));
    }
});

const getInitialStringValue = (key) => (localStorage.getItem(key) || "");
const getInitialBooleanValue = (key) => (localStorage.getItem(key) === "true" || false);
const getInitialUserItemValue = (user) => (JSON.parse(localStorage.getItem(user)) || { image: "", login: "" });

const Settings = (props) => {
    const [settingsAreVisible, toggleSettingsVisibility] = useState(getInitialBooleanValue("settingsAreVisible"));
    const [gitHubLogin, setGitHubLogin] = useState(getInitialStringValue("gitHubLogin"));
    const [gitHubRepository, setGitHubRepository] = useState(getInitialStringValue("gitHubRepository"));
    const [reviewee, setReviewee] = useState(getInitialUserItemValue("reviewee"));
    const [reviewer, setReviewer] = useState(getInitialUserItemValue("reviewer"));
    const [loginError, setLoginError] = useState("");
    const [repositoryError, setRepositoryError] = useState("");
    const [requestError, setRequestError] = useState("");
    const [userRequestIsInProcess, setUserRequestState] = useState(false);
    const [contributorsRequestIsInProcess, setContributorsRequestState] = useState(false);
    const [userHasContributions, setUserHasContributions] = useState(getInitialBooleanValue("userHasContributions"));

    const apiRateLimitError = "API rate limit exceeded";
    const userData = useRef(props.userData);
    const userDataJson = useRef(props.userDataJson);
    const repositoryContributors = useRef(props.repositoryContributors);
    const repositoryContributorsJson = useRef(props.repositoryContributorsJson);

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

    const processUserDataResponse = useCallback((response, responseJson) => {
            if (response.status >= 200 && response.status < 300) {
                setValue({ image: responseJson.avatar_url, login: responseJson.login }, "reviewee", setReviewee);
            } else if (apiRateLimitExceeded(response, responseJson)) {
                setLoginError(apiRateLimitError);
            } else {
                setLoginError('Print login, for example "console1928"');
            }
            setUserRequestState(false);
        }, []);

    const setUserContributions = useCallback((contributors) => {
        setValue(false, "userHasContributions", setUserHasContributions);

        for (const contributor of contributors) {
            if (contributor.login === gitHubLogin) {
                setValue(true, "userHasContributions", setUserHasContributions);
            }
        }
    }, []);

    const processContributorsResponse = useCallback((response, responseJson) => {
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
            setContributorsRequestState(false);
        }, []);

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
        setUserRequestState(true);
        props.getUserData(gitHubLogin);
        setContributorsRequestState(true);
        props.getRepositoryContributors(gitHubRepository);
    };

    const renderUserHasNoContributions = () => (
        <div className={"settings__no-contributions"}>
            Current user has no contributions to this repository.
            Try changing GitHub login or GitHub repository.
        </div>
    );

    useEffect(() => {
        if (
            props.userData !== null &&
            props.userData !== userData &&
            props.userDataJson !== null &&
            props.userDataJson !== userDataJson
        ) {
            processUserDataResponse(props.userData, props.userDataJson);
        }
    }, [props.userData, props.userDataJson, processUserDataResponse]);

    useEffect(() => {
        if (
            props.repositoryContributors !==  null &&
            props.repositoryContributors !== repositoryContributors &&
            props.repositoryContributorsJson !== null &&
            props.repositoryContributorsJson !== repositoryContributorsJson
        ) {
            processContributorsResponse(props.repositoryContributors, props.repositoryContributorsJson);
        }
    }, [props.repositoryContributors, props.repositoryContributorsJson, processContributorsResponse]);

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
                            disabled={userRequestIsInProcess || contributorsRequestIsInProcess}
                        />
                        <CustomInput
                            type="text"
                            placeholder="GitHub repository"
                            value={gitHubRepository}
                            onChange={event => setValue(event.target.value, "gitHubRepository", setGitHubRepository)}
                            errormessage={repositoryError}
                            disabled={userRequestIsInProcess || contributorsRequestIsInProcess}
                        />
                        <BlackList />
                        <CustomButton
                            type={"submit"}
                            buttonstyle={"filled"}
                            buttontype={"default"}
                            disabled={userRequestIsInProcess || contributorsRequestIsInProcess}
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
