import React, {useContext} from 'react'
import { RepoContext } from '../context/RepoContext';
import FlexContainer from '../util/FlexContainer';

import "../../styles/styles.css"

const SelectedReviewer = () => {

    const { selectedRepo } = useContext(RepoContext);

    return (
        !!selectedRepo?.reviewer?.login && (
            <>
                <div style = {{display: "flex", alignItems: "center", fontSize: "20px"}}>&#x2192;</div>
                <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>  
                    
                            <h3 className = "subTitle">Reviewer</h3>
                            <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>
                                <p>{selectedRepo.reviewer.login}</p>
                                <img alt = "user_avatar" src = {selectedRepo.reviewer.avatar_url} 
                                    style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                            </FlexContainer>
                </FlexContainer>
            </>
        )
    )
    
}

export default SelectedReviewer
