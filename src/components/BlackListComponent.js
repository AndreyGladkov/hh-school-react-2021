import React from 'react'

const BlackListComponent = ({login, index, RemoveElementFromBlacklist}) => {
    return (
        <div style = {{display: "flex"}}>
            <div style = {{marginRight: "20px", cursor: "pointer"}} onClick = {() => RemoveElementFromBlacklist(login)}>X</div>
            <div>{index + 1} - {login}</div>
        </div>
    )
}

export default BlackListComponent
