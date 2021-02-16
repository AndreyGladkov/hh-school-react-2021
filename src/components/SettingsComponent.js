import React from 'react'
import BlackList from './BlackList'
import FetchGithubUserByLogin from './FetchGithubUserByLogin'
import FlexContainer from './FlexContainer'

const SettingsComponent = () => {
    return (
        <FlexContainer flexDirection = "column">
            <FetchGithubUserByLogin />
            <BlackList />
        </FlexContainer>
    )
}

export default SettingsComponent
