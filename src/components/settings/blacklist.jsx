import React, { useEffect, useRef, useState } from 'react'

export function Blacklist(props) {
    const [list, useList] = useState(props.blacklist);
    const val = useRef(null);
    useEffect(() => {

    });
    return (
        <>
        <ul>
            {list.map((value) => {
                return <li key={value}>{value}<button onClick={() => {props.onDelete(value)}}>-</button></li>
            })}
        </ul>
        <div>
            <input ref={val} type='text'/><button onClick={() => {props.onAdd(val.current.value)}}>+</button>
        </div>
        </>
    );
}