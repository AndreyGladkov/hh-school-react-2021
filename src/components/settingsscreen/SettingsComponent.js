import React from 'react'
import BlackList from './BlackList'
import FlexContainer from '../util/FlexContainer'
import GenerateReviewerComponent from './GenerateReviewerComponent'
import SelectRepositoryComponent from './SelectRepositoryComponent'
import SelectUserComponent from './SelectUserComponent'

const SettingsComponent = () => {

    return (
        <FlexContainer flexDirection = "column">
            <SelectUserComponent />
            <SelectRepositoryComponent />
            <GenerateReviewerComponent />
            <BlackList />
        </FlexContainer>
    )
}

export default SettingsComponent
