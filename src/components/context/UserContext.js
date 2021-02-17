import React, {useReducer, createContext, useEffect} from "react"

export const UserContext = createContext();

const initialState = {
    user: {},
    repos: [],
    error: ""
}

const getGithubUserDataFromLocalStorage = () => {
    return localStorage.getItem("githubUserData") === initialState ? initialState : JSON.parse(localStorage.getItem("githubUserData"));
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "FETCH_USER":
            return {
                user: action.user, 
                repos: action.repos,
                error: ""
            }
        case "ERROR":
            return {
                user: {}, 
                repos: [],
                error: action.error
            }
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

function UserContextProvider({children}) {
    
    const [githubUserData, dispatchGithubUserData] = useReducer(userReducer, getGithubUserDataFromLocalStorage());

    useEffect(() => {
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData))
    }, [githubUserData])

    return (
        <UserContext.Provider value = {{githubUserData, dispatchGithubUserData}}>
                {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider