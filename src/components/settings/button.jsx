import { useEffect } from "react";

export function ButtonSettings(props) {
    useEffect(() => {

    },[]);
    return (
        <>
            <button onClick={()=>{  if (props.onClick) {props.onClick()}}} id="settings-button">Настройки</button>
        </>
    );
}