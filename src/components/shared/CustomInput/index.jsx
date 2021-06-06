import React from "react";
import "./styles.css";

const CustomInput = (props) => (
    <React.Fragment>
        <input {...props} className={`custom-input${props.errormessage ? "--error" : ""}`} />
        {props.errormessage && <div className={"custom-input__error-message"}>{props.errormessage}</div>}
    </React.Fragment>
);

export default CustomInput;
