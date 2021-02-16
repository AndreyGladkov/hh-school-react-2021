import React from 'react'
import GenerateReviewerComponent from '../settingsscreen/GenerateReviewerComponent';
import FlexContainer from '../util/FlexContainer'
import SelectedRepo from './SelectedRepo';
import SelectedReviewer from './SelectedReviewer';
import SelectedUser from './SelectedUser';

const GenerateReviewerScreen = () => {
    return (
        <FlexContainer flexDirection = "column" style = {{padding: "20px"}}>
            <GenerateReviewerComponent />
            <FlexContainer>
                <SelectedUser />
                <SelectedRepo />
                <SelectedReviewer />
            </FlexContainer>
        </FlexContainer>
    )
}

export default GenerateReviewerScreen
