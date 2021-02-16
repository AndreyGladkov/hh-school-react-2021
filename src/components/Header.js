import React from 'react'
import FlexContainer from './util/FlexContainer'

const Header = (props) => {
    return (
        <FlexContainer style = {{backgroundColor: "#0e9aa7"}}>
            <h2 style = {{marginLeft: "20px"}}>Random Github Reviewer App</h2>
            <div style = {{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "20px"}}>
                <button 
                    onClick = {() => props.setShowSettings(!props.showSettings)}
                    style = {{width: "100px", padding: "10px", fontSize: "13px"}}>
                        {props.showSettings ? "Hide settings" : "Show settings"}
                </button>
            </div>
        </FlexContainer>
    )
}

export default Header
