import React, {useState, createContext, useEffect} from "react"

export const UserContext = createContext();

const initialState = {
    repo: {},
    contibutors: []
}

const getGithubUserDataFromLocalStorage = () => {
    return localStorage.getItem("githubUserData") === null ? null : JSON.parse(localStorage.getItem("githubUserData"));
}

const getGithubUserReposFromLocalStorage = () => {
    return localStorage.getItem("githubUserRepos") === null ? null : JSON.parse(localStorage.getItem("githubUserRepos"));
}

function UserContextProvider({children}) {
    
    const [githubUserData, setGithubUserData] = useState(getGithubUserDataFromLocalStorage());
    const [githubUserRepos, setGithubUserRepos] = useState(getGithubUserReposFromLocalStorage());

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