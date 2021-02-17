import React, { useEffect } from 'react'
import {Name, Photo} from './'

export function Card(props) {
    useEffect(() => {
        console.log(props);
    })
    return (
        <div className="review_card">
            <Photo img={props.image}/>
            <Name name={props.name}/>
        </div>
    );
}