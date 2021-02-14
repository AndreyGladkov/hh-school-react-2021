import React from "react";
import "../css/Card.css";

export default function Card({ header, headerValue, content }) {
    return (
        <div className="card">
            <div className="card__header">{`${header}: ${headerValue}`}</div>
            <img src={content} alt="Avatar" />
        </div>
    );
}
