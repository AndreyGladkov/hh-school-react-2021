import React, { useState, useRef, useEffect, useCallback } from "react";
import CustomButton from "../shared/CustomButton";
import CustomInput from "../shared/CustomInput";
import "./styles.css";

const ModalWindow = (props) => {
    const [inputValue, setInputValue] = useState("");

    const contentRef = useRef(null);

    const onCloseModal = useCallback((event) => {
        props.clearErrorMessage();
        props.closeModal(event);
    }, [props]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contentRef.current && !contentRef.current.contains(event.target)) {
                onCloseModal(event);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props, contentRef, onCloseModal]);

    const onSubmitButtonClick = event => {
        event.preventDefault();
        props.useModalValue(inputValue);
    };

    const onInputChange = (event) => {
        setInputValue(event.target.value);
        if (props.errorMessage) {
            props.clearErrorMessage();
        }
    };

    return (
        <div className={"input-modal-window"}>
            <div className={"input-modal-window__content"} ref={contentRef}>
                <button className={"input-modal-window__close-button"} onClick={onCloseModal}>❌</button>
                <CustomInput
                    className={"input-modal-window__text-input"}
                    type="text"
                    placeholder={props.inputPlaceholder}
                    value={inputValue}
                    onChange={onInputChange}
                    errormessage={props.errorMessage}
                />
                <CustomButton
                    className={"input-modal-window__add-button"}
                    onClick={onSubmitButtonClick}
                    buttonstyle={"outlined"}
                    buttontype={"default"}
                >
                    {props.submitButtonName}
                </CustomButton>
            </div>
        </div>
    );
};

export default ModalWindow;
