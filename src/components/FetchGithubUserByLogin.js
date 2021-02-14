import React, {useState, useEffect} from 'react'
import useFetchWithErrorHandling from './useFetchWithErrorHandling'

const FetchGithubUserByLogin = (props) => {

    /* const [githubUserData, setGithubUserData] = useState();
    const [errorMessage, setErrorMessage] = useState(); */
    const [githubUser, setGithubUser] = useState();
    const [githubUserUrl, setGithubUserUrl] = useState();
    const [githubUserData, error] = useFetchWithErrorHandling("https://api.github.com/users/" + githubUser)

    /* const fecthGithubUserData = () => {
        fetch("https://api.github.com/users/" + props.githubUser)
            .then(handleError)
                .then(response => response.json())
                    .then(data => {console.log(data); setGithubUserData(data); setErrorMessage()})
                        .catch(error => {console.log("Errore in request"); setErrorMessage("Sorry. User with such login doesn't exist")})
    } */

    return (
        <div>
            <input type = "text" onChange = {(event) => setInputValue(event.target.value)} />
            <button type = "button" onClick = {() => setGithubUser(inputValue)}>Fetch New User</button>
            {githubUserData && githubUserData.login &&
                <div>
                    <p>{githubUserData.login}</p>
                    <img alt = "user_avatar" src = {githubUserData.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }
            <div>{error}</div>
        </div>
    )
}

export default FetchGithubUserByLogin
