import React from 'react'
import {Name, Photo} from './'

function Card(props) {
    return (
        <div className="review_card">
            <Photo />
            <Name />
        </div>
    );
}