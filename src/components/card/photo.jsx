import React from 'react'

export function Photo(props) {
    return (
        <img className="image" src={props.image}/>
    );
}