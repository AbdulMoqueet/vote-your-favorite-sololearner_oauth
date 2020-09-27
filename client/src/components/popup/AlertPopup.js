import React from 'react'

const AlertPopup = (props) => {

    return (
        <div className="confirm-popup">

            <div className="confirm-popup__box">
                <div className="confirm-popup__title mt-1">{props.title}</div>
                <div className="confirm-popup__msg mt-2">{props.msg}</div>
                <div className="confirm-popup__button-holder mt-3 pb-2" style={{ justifyContent: "flex-end" }}>
                    <div className="confirm-popup__btn confirm-popup__confirm" onClick={props.hide}>Okay</div>
                </div>
            </div>

        </div>
    )
}

export default AlertPopup;