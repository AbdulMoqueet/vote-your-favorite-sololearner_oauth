import React from 'react'

const AlertPopup = (props) => {

    let okBtn = <div className="confirm-popup__btn confirm-popup__confirm" onClick={props.hide}>Okay</div>;

    if (props.scroll) {
        okBtn = <div className="confirm-popup__btn confirm-popup__confirm"
            onClick={() => props.hide('yes')}>Okay</div>
    }

    return (
        <div className="confirm-popup">

            <div className="confirm-popup__box">
                <div className="confirm-popup__title mt-1">{props.title}</div>
                <div className="confirm-popup__msg mt-2">{props.msg}</div>
                <div className="confirm-popup__button-holder mt-3 pb-2" style={{ justifyContent: "flex-end" }}>
                    {okBtn}
                </div>
            </div>

        </div>
    )
}

export default AlertPopup;