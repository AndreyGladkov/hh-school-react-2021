import React, {useState} from 'react'
import useFetchWithErrorHandling from './useFetchWithErrorHandling'

const FetchGithubUserByLogin = (props) => {

    const [githubUser, setGithubUser] = useState();
    const [githubUserUrl, setGithubUserUrl] = useState();
    const [githubUserData, error] = useFetchWithErrorHandling(githubUserUrl)

    return (
        <div>
            <input type = "text" onChange = {(event) => setGithubUser(event.target.value)} />
            <button type = "button" onClick = {() => setGithubUserUrl("https://api.github.com/users/" + githubUser)}>Fetch New User</button>
            {githubUserData && githubUserData.login &&
                <div>
                    <p>{githubUserData.login}</p>
                    <img alt = "user_avatar" src = {githubUserData.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }
            {error && <div>User with such login does not exist</div>}
        </div>
    )
}

export default FetchGithubUserByLogin
