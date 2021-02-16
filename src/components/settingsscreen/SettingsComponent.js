import React from 'react'
import BlackList from './BlackList'
import FlexContainer from '../util/FlexContainer'
import SelectRepositoryComponent from './SelectRepositoryComponent'
import SelectUserComponent from './SelectUserComponent'

const SettingsComponent = () => {

    return (
        <FlexContainer flexDirection = "column" style = {{padding: "20px", flex: "1 1 70%"}}>
            <SelectUserComponent />
            <SelectRepositoryComponent />
            <BlackList />
        </FlexContainer>
    )
}

export default SettingsComponent
