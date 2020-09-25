import React from 'react';

const List = (props) => {

    const profileUrl = `https://www.sololearn.com/Profile/${props.soloId}/?ref=app`;
    const profilePic = `https://api.sololearn.com/Uploads/Avatars/${props.soloId}.jpg`;


    return (
        <div className="list-container__list mt-4">

            <img className="list-container__dp" 
            src={profilePic}
            alt="sololearner_dp" />

            <div className="list-container__info-holder">
                <div className="list-container__name">{props.name}</div>
                <div className="list-container__votes">{props.vote} votes</div>
            </div>

            <div className="list-container__more-btn">
                <i className="ri-arrow-right-s-line"></i>
            </div>

        </div>
    );
}

export default List;