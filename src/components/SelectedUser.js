import React, {useContext} from 'react'
import { UserContext } from './context/UserContext';
import FlexContainer from './FlexContainer';

const SelectedUser = () => {

    const { githubUserData } = useContext(UserContext);

    return (
        <FlexContainer flexDirection = "column">
            <h3>Selected user</h3>
            {githubUserData &&
                <div>
                    <p>{githubUserData.login}</p>
                    <img alt = "user_avatar" src = {githubUserData.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }
        </FlexContainer>
    )
}

export default SelectedUser
