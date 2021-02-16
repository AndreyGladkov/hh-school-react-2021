import React from 'react'

import "../../styles/styles.css"

const BlackListComponent = ({login, index, RemoveElementFromBlacklist}) => {
    return (
        <div style = {{display: "flex", lineHeight: "20px"}}>
            <div className = "removeBtn"
                onClick = {() => RemoveElementFromBlacklist(login)}>X</div>
            <div>{login}</div>
        </div>
    )
}

export default BlackListComponent
