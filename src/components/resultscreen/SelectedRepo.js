import React from 'react'
import FlexContainer from '../util/FlexContainer';

import { useSelector } from "react-redux"; 

import "../../styles/styles.css"

const SelectedRepo = () => {

    const selectedRepo = useSelector(state => state.selectedRepo)

    return (
        !!selectedRepo?.repo?.name && ( 
        <>
            <div style = {{display: "flex", alignItems: "center", fontSize: "20px"}}>&#x2192;</div>
            <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>  
                
                        <h3 className = "subTitle">Repository</h3>
                        <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>
                            <p>{selectedRepo.repo.name}</p>
                        </FlexContainer>
            </FlexContainer>
        </>)
    )
}

export default SelectedRepo
