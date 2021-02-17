import React, {createContext, useState, useEffect} from "react";

export const BlackListContext = createContext();

const getBlackListFromLocalStorage = () => {
    const storedBlackList = JSON.parse(localStorage.getItem("blacklist"));
    return storedBlackList == null ? [] : storedBlackList;
}

const BlackListContextProvider = (props) => {

    const [blacklist, setBlacklist] = useState(getBlackListFromLocalStorage());

    useEffect(() => {
        localStorage.setItem("blacklist", JSON.stringify(blacklist))
    }, [blacklist])

    return (
        <BlackListContext.Provider value = {{blacklist, setBlacklist}}>
            {props.children}
        </BlackListContext.Provider>
    )
}

export default BlackListContextProvider
