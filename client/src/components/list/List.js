import React from 'react';

const List = (props) => {
    return (
        <div className="list-container__list mt-4">

            <img className="list-container__dp" 
            src="https://api.sololearn.com/Uploads/Avatars/5371585.jpg" 
            alt="sololearner_dp" />

            <div className="list-container__info-holder">
                <div className="list-container__name">{props.name}</div>
                <div className="list-container__votes">{props.vote} votes</div>
            </div>

            <div className="list-container__more-btn">
                <i class="ri-arrow-right-s-line"></i>
            </div>

        </div>
    );
}

export default List;