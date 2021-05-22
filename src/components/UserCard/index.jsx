import React from "react";
import Constants from "../Constants";
import "./styles.css";

const UserCard = (props) => {
    return (
        <a className={"user-card"} href={`${Constants.GITHUB_BASE_URL}/${props.login}`}>
            <div className={"user-card__image"} style={{ backgroundImage: `url(${props.image}` }} />
            <div className={"user-card__upper-caption"}>{props.login}</div>
            <div>{`(${props.caption})`}</div>
        </a>

    );
};

export default UserCard;
