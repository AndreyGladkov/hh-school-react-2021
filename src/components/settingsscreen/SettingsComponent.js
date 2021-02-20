import React, {useEffect} from 'react'
import BlackList from './BlackList'
import FlexContainer from '../util/FlexContainer'
import SelectRepositoryComponent from './SelectRepositoryComponent'
import SelectUserComponent from './SelectUserComponent'

import {useSelector} from "react-redux"

const SettingsComponent = () => {

    const selectedRepo = useSelector(state => state.selectedRepo)
    const githubUserData = useSelector(state => state.githubUserData)
    const blacklist = useSelector(state => state.blacklist)

    useEffect(() => {
        console.log("Selected")
        localStorage.setItem("selectedRepo", JSON.stringify(selectedRepo))
    }, [selectedRepo])

    useEffect(() => {
        console.log("user data")
        localStorage.setItem("githubUserData", JSON.stringify(githubUserData))
    }, [githubUserData])

    useEffect(() => {
        console.log("blacklist")
        localStorage.setItem("blacklist", JSON.stringify(blacklist))
    }, [blacklist])

    return (
        <FlexContainer flexDirection = "column" style = {{padding: "20px", flex: "1 1 70%"}}>
            <SelectUserComponent />
            <SelectRepositoryComponent />
            <BlackList />
        </FlexContainer>
    )
}

export default SettingsComponent
