import { useEffect } from "react";

export function ButtonSettings(props) {
    return (
        <button onClick={() => { if (props.onClick) { props.onClick() } }} id="settings-button">{props.text}</button>
    );
}