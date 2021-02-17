import React, {useState, useContext} from 'react'
import BlackListComponent from './BlackListComponent'
import { BlackListContext } from '../context/BlackListContext'

const BlackList = () => {

    const { blacklist, setBlacklist } = useContext(BlackListContext)
    const [loginForBlacklist, setLoginForBlacklist] = useState("")

    const removeElementFromBlacklist = (login) => {
        setBlacklist(blacklist.filter(element => element !== login));
    }

    const addLoginToBlackList = (login) => {
        if (login !== "" && !blacklist.map(item => item.toLowerCase()).includes(login.toLowerCase())) {
            setBlacklist([...blacklist, login])
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
                {blacklist.map((login, index) => {
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
