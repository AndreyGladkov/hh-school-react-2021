import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext';
import FlexContainer from '../util/FlexContainer';

const SelectedUser = () => {

    const { githubUserData } = useContext(UserContext);

    return (
        <FlexContainer flexDirection = "column">
            <h4>Selected user</h4>
            {githubUserData &&
                <div>
                    <p>{githubUserData.user.login}</p>
                    <img alt = "user_avatar" src = {githubUserData.user.avatar_url} 
                        style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
            }
        </FlexContainer>
    )
}

export default SelectedUser
