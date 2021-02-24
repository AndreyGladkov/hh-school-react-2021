import React, { useEffect } from 'react'
import { Name, Photo } from './'

export function Card(props) {
    useEffect(() => {
    })
    return (
        <div className={`review_card ${props.black ? 'black_label' : ''}`}
        >
            <Photo image={props.image} />
            <Name name={props.name} />
            { (props.onClick || props.onBlackList) ?
                <div className="review_buttons">
                    {props.onClick ? <button onClick={() => { if (props.onClick) { props.onClick(props.name) } }}>Review</button> : <></>}
                    {props.onBlackList && !props.black ? <button onClick={() => { if (props.onBlackList) { props.onBlackList(props.name) } }}>В черный список</button> : <></>}
                    {props.onRemoveBl && props.black ? <button onClick={() => { if (props.onRemoveBl) { props.onRemoveBl(props.name) } }}>Удалить из ЧС</button> : <></>}
                </div>
                : <></>
            }
        </div>
    );
}