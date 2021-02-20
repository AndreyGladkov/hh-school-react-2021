import React from 'react';

const CardUser = ({login, avatarUrl}) => {
    return (
        <div>
            <h3>{login}</h3>
            <img width="200" height="200" src={avatarUrl} alt={login}/>
        </div>
    )
}

export default CardUser;
