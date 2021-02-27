import React from 'react'

export function Blacklist(props) {
    return (
        <>
            <ul>
                {
                    Array.isArray(props.blacklist) ? props.blacklist.map((value) => {
                        return <li key={value}><span>{value}</span><button onClick={() => { props.onDelete(value) }}>-</button></li>
                    }) : null
                }
            </ul>
            <button onClick={() => props.clearAll()}>Очистить список</button>
        </>
    );
}