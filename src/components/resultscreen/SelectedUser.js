import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext';
import FlexContainer from '../util/FlexContainer';

import "../../styles/styles.css"

const SelectedUser = () => {

    const { githubUserData } = useContext(UserContext);

    return (
        <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>
            {githubUserData && githubUserData.user.login &&
                <>
                    <h3 className = "subTitle">Selected user</h3>
                    <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>
                        <p>{githubUserData.user.login}</p>
                        <img alt = "user_avatar" src = {githubUserData.user.avatar_url} 
                            style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                    </FlexContainer>
                </>
            }
        </FlexContainer>
    )
}

export default SelectedUser
