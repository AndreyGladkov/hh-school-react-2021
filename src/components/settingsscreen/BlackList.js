import React, {useState, useEffect} from 'react'
import BlackListComponent from './BlackListComponent'

import { useSelector, useDispatch } from "react-redux"

const BlackList = () => {

    const blacklist = useSelector((state) => state.blacklist);
    const dispatch = useDispatch();

    const [loginForBlacklist, setLoginForBlacklist] = useState("");

    useEffect(() => {
        localStorage.setItem("blacklist", JSON.stringify(blacklist));
    }, [blacklist])

    const removeElementFromBlacklist = (login) => {
        dispatch({type: "REMOVE_LOGIN_FROM_BLACKLIST", payload: {login: login}})
    }


    const addLoginToBlackList = (login) => {
        if (login !== "" && !blacklist.map(item => item.toLowerCase()).includes(login.toLowerCase())) {
            dispatch({type: "ADD_LOGIN_TO_BLACKLIST", payload: {login: login}})
        }
        setLoginForBlacklist("")
    } 

    return (
        <div>
            <h3 className = "subTitle">Black List</h3>
            <input type = "text" 
                onChange = {(event) => setLoginForBlacklist(event.target.value)} 
                value = {loginForBlacklist}
                style = {{padding: "2px", marginRight: "20px"}}
            />
            <button onClick = {() => addLoginToBlackList(loginForBlacklist)} className = "fetchUserBtn" style = {{marginBottom: "10px"}}>
                Add to blacklist
            </button>
            {blacklist && blacklist.length > 0 &&
            <div>
                {blacklist.map(login => {
                    return (
                        <BlackListComponent
                            key = {login} 
                            login = {login} 
                            removeElementFromBlacklist = {removeElementFromBlacklist}
                        />)
                })}
            </div>}
        </div>
    )
}

export default BlackList
