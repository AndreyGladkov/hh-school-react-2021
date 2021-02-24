import React, { useEffect, useRef, useState } from 'react'

export function Blacklist(props) {
    const [list, useList] = useState(props.blacklist);
    const val = useRef(null);
    useEffect(() => {
        console.log(props)
    }, []);
    return (
        <>
            <ul>
                {
                    Array.isArray(props.blacklist) ? props.blacklist.map((value) => {
                        return <li key={value}><span>{value}</span><button onClick={() => { props.onDelete(value) }}>-</button></li>
                    }) : <></>
                }
            </ul>
            <button onClick={() => props.clearAll()}>Очистить список</button>
        </>
    );
}