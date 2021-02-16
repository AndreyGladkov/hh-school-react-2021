import React from 'react'
import FlexContainer from '../util/FlexContainer'
import SelectedReviewer from './SelectedReviewer';
import SelectedUser from './SelectedUser';

const GenerateReviewerScreen = () => {
    return (
        <FlexContainer>
            <SelectedUser />
            <SelectedReviewer />
        </FlexContainer>
    )
}

export default GenerateReviewerScreen
