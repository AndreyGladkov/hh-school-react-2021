import React, {useContext} from 'react'
import { RepoContext } from '../context/RepoContext';
import FlexContainer from '../util/FlexContainer';

import "../../styles/styles.css"

const SelectedRepo = () => {

    const { selectedRepo } = useContext(RepoContext);

    if (selectedRepo && selectedRepo.repo) {
        return (
            <>
            {selectedRepo.repo.name && 
            <>
                <div style = {{display: "flex", alignItems: "center", fontSize: "20px"}}>&#x2192;</div>
                <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>  
                    
                            <h3 className = "subTitle">Repository</h3>
                            <FlexContainer flexDirection = "column" style = {{alignItems: "center"}}>
                                <p>{selectedRepo.repo.name}</p>
                            </FlexContainer>
                </FlexContainer>
            </>}
            </>
        )
    }
    
    return <></>;
}

export default SelectedRepo
