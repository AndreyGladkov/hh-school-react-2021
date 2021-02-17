import React from 'react'

const FlexContainer = (props) => {
    return (
        <div style = {{display: "flex", width: "100%", flexDirection: props.flexDirection, ...props.style}}>
            {props.children}
        </div>
    )
}

export default FlexContainer
