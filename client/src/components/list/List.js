import React from 'react';
import { Link } from "react-router-dom";

const List = (props) => {

    const profileUrl = `https://www.sololearn.com/Profile/${props.soloId}/?ref=app`;
    const profilePic = `https://api.sololearn.com/Uploads/Avatars/${props.soloId}.jpg`;


    return (
        <div className="list-container__list mt-4" onClick={props.click}>

            <div className="list-container__img-box">

                <img className={`list-container__dp${props.name.toLowerCase() === 'mitali' ? " " + props.name.toLowerCase() : ''}`}
                    src={profilePic}
                    alt="sololearner_dp" />

            </div>



            <div className="list-container__info-holder">
                <div className="list-container__name">{props.name}</div>
                <div className="list-container__votes">{props.vote} votes</div>
            </div>

            <Link to='/details' className="list-container__more-btn">
                <i className="ri-arrow-right-s-line"></i>
            </Link>

        </div>
    );
}

export default List;