import React, { useEffect, useState } from 'react'

export function Blacklist(props) {
    const [list, useList] = useState(props.blacklist);
    useEffect(() => {

    });
    return (
        <ul>
            {list.map((value) => {
                return <li>{value}</li>
            })}
        </ul>
    );
}