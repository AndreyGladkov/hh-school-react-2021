import React, {useReducer, createContext, useEffect} from "react"

export const RepoContext = createContext();

const initialState = {
    repo: {},
    contibutors: []
}

const getSelectedRepoFromLocalStorage = () => {
    return localStorage.getItem("selectedRepo") === initialState ? initialState : JSON.parse(localStorage.getItem("selectedRepo"));
}

const repoReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return {
                repo: action.repo, 
                contributors: action.contributors
            }
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

function RepoContextProvider({children}) {
    
    const [selectedRepo, dispatchSelectedRepo] = useReducer(repoReducer, getSelectedRepoFromLocalStorage())

    useEffect(() => {
        localStorage.setItem("selectedRepo", JSON.stringify(selectedRepo));
    }, [selectedRepo])

    return (
        <RepoContext.Provider value = {{selectedRepo, dispatchSelectedRepo}}>
                {children}
        </RepoContext.Provider>
    )
}

export default RepoContextProvider