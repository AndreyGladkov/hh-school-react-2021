import React, {useState, createContext, useEffect} from "react"

export const UserContext = createContext();
export const UserReposContext = createContext();

const getGithubUserDataFromLocalStorage = () => {
    return localStorage.getItem("githubUserData") === null ? null : JSON.parse(localStorage.getItem("githubUserData"));
}

const getGithubUserReposFromLocalStorage = () => {
    return localStorage.getItem("githubUserRepos") === null ? null : JSON.parse(localStorage.getItem("githubUserRepos"));
}

function UserContextProvider({children}) {
    
    const [reviewer, setReviewer] = useState();
    const [repoContributors, setRepoContributors] = useState()

    useEffect(() => {
        if (githubUserData === undefined) return;
        console.log("Setting user data in local sotage")
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData))
    }, [githubUserData])

    useEffect(() => {
        if (githubUserRepos === undefined) return;
        console.log("Setting user repos in local sotage")
        localStorage.setItem("githubUserRepos", JSON.stringify(githubUserRepos))
    }, [githubUserRepos])

    return (
        <UserContext.Provider value = {{githubUserData, setGithubUserData}}>
            <UserReposContext.Provider value = {{githubUserRepos, setGithubUserRepos}}>
                {children}
            </UserReposContext.Provider>
        </UserContext.Provider>
    )
}

export default UserContextProvider