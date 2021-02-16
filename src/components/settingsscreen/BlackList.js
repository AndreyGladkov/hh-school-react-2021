import React, {useState, useContext} from 'react'
import BlackListComponent from './BlackListComponent'
import { BlackListContext } from '../context/BlackListContext'

const BlackList = () => {

    const { blacklist, setBlacklist } = useContext(BlackListContext)
    const [loginForBlacklist, setLoginForBlacklist] = useState("")

    const RemoveElementFromBlacklist = (login) => {
        setBlacklist(blacklist.filter(element => element !== login));
    }

    const addLoginToBlackList = (login) => {
        if (login !== "" && !blacklist.includes(login)) {
            setBlacklist([...blacklist, login])
        }
        setLoginForBlacklist("")
    } 

    return (
        <div>
            <input type = "text" 
                onChange = {(event) => setLoginForBlacklist(event.target.value)} 
                value = {loginForBlacklist}
                style = {{padding: "2px", marginRight: "20px"}}
            />
            <button onClick = {() => addLoginToBlackList(loginForBlacklist)} style = {{padding: "2px"}}>
                Add to blacklist
            </button>
            {blacklist && blacklist.length > 0 &&
            <div>
                <div>Blacklist:</div>
                {blacklist.map((login, index) => {
                    return (
                        <BlackListComponent
                            key = {login} 
                            login = {login} 
                            index = {index} 
                            RemoveElementFromBlacklist = {RemoveElementFromBlacklist}
                        />)
                })}
            </div>}
        </div>
    )
}

export default BlackList
