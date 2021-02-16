import React, {useContext} from 'react'
import { RepoContext } from '../context/RepoContext';

const SelectedReviewer = () => {

    const { selectedRepo } = useContext(RepoContext);

    if (selectedRepo.reviewer) {
        return (
            <div>
                <h4>Reviewer</h4>
                {selectedRepo.reviewer.login && 
                    <div>
                        <p>{selectedRepo.reviewer.login}</p>
                        <img alt = "user_avatar" src = {selectedRepo.reviewer.avatar_url} 
                            style = {{width: "50px", height: "50px", borderRadius: "50%"}}/>
                    </div>
                }
            </div>
        )
    }
    
    return <></>;
    
}

export default SelectedReviewer
