import React from 'react'
import FlexContainer from '../util/FlexContainer';

import { useSelector } from "react-redux"; 

import "../../styles/styles.css"

const SelectedReviewer = () => {

    const selectedRepo = useSelector(state => state.selectedRepo);

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
