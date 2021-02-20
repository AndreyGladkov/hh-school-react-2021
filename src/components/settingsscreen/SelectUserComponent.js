import React, { useState, useEffect } from "react";
import { clearRepo } from "../reducers/selectedRepoReducer";
import { fetchUserAsync, fetchReposAsync } from "../util/fetchUserAsync";

import { useSelector, useDispatch } from "react-redux";

import "../../styles/styles.css";

const SelectUserComponent = () => {
    const githubUserData = useSelector((state) => state.githubUserData);
    const dispatch = useDispatch();

    const [githubUser, setGithubUser] = useState();

    useEffect(() => {
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData));
    }, [githubUserData]);

    const valideUserInput = (githubUser) => {
        return (
            githubUser &&
            (!githubUserData?.user?.login ||
                githubUser.toLowerCase() !==
                    githubUserData.user.login.toLowerCase())
        );
    };

    function fetchUserDataAsync() {
        if (!valideUserInput(githubUser)) return;
        dispatch(clearRepo());
        dispatch(fetchUserAsync(githubUser))
            .then((user) => dispatch(fetchReposAsync(user)))
            .then(() => console.log("asyncMiddleware"));
    }

    return (
        <div style={{ color: "#4a4e4d", marginBottom: "20px" }}>
            <h3 className="subTitle">User github login</h3>
            <input
                type="text"
                onChange={(event) => setGithubUser(event.target.value)}
            />
            <button
                type="button"
                onClick={fetchUserDataAsync}
                className="fetchUserBtn"
            >
                Fetch User Data
            </button>
            {
                <div style={{ color: "#fe8a71" }}>
                    &#8203;{githubUser && githubUserData?.error}
                </div>
            }
        </div>
    );
};

export default SelectUserComponent;
