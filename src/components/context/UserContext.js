import React, {useState, createContext, useEffect} from "react"
import useFetchWithErrorHandling from "../useFetchWithErrorHandling";

export const UserContext = createContext();
export const UserReposContext = createContext();

const getGithubUserDataFromLocalStorage = () => {
    return localStorage.getItem("githubUserData") == null ? null : JSON.parse(localStorage.getItem("githubUserData"));
}

function UserContextProvider({children}) {
    
    const [githubUserData, setGithubUserData] = useState(getGithubUserDataFromLocalStorage());
    const [githubUserReposUrl, setGithubUserReposUrl] = useState();
    const [githubUserRepos] = useFetchWithErrorHandling(githubUserReposUrl)

    useEffect(() => {
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData))
    }, [githubUserData])

    useEffect(() => {
        if (githubUserData == null) return;
        setGithubUserReposUrl("https://api.github.com/users/" + githubUserData.login + "/repos?per_page=100")
    }, [githubUserData])

    return (
        <UserContext.Provider value = {{githubUserData, setGithubUserData}}>
            <UserReposContext.Provider value = {{githubUserRepos}}>
                {children}
            </UserReposContext.Provider>
        </UserContext.Provider>
    )
}

export default UserContextProvider