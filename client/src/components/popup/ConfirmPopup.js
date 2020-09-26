import React from 'react'

const Popup = (props) => {


    return (
        <div className="confirm-popup">

            <div className="confirm-popup__box">
                <div className="confirm-popup__title mt-1">Vote for {props.coder.name} ?</div>
                <div className="confirm-popup__msg mt-2">Are you sure? You can vote only one person & once you've voted it can't change.</div>
                <div className="confirm-popup__button-holder mt-3 pb-2">
                    <div className="confirm-popup__btn confirm-popup__back" onClick={props.closePopup}>Go Back</div>
                    <div className="confirm-popup__btn confirm-popup__confirm" onClick={() => props.submitVote(props.coder._id)}>Confirm Vote</div>
                </div>
            </div>

        </div>
    )
}

export default Popup;