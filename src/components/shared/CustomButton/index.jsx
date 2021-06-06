import React from "react";
import "./styles.css";

const CustomButton = (props) => (
    <button {...props} className={`custom-button--${props.buttonstyle}--${props.buttontype}`} />
);

export default CustomButton;
