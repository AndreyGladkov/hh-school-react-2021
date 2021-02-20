import React from 'react';

import "./CardUser.css"

const CardUser = ({login, avatarUrl, isActive=false}) => {
    return (
        <div className={`CardUser ${isActive && "CardUser_active"}`}>
            <h3>{login}</h3>
            <img width="200" height="200" src={avatarUrl} alt={login}/>
        </div>
    )
}

export default CardUser;
