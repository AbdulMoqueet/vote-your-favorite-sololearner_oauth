import React from 'react';
import { Link } from "react-router-dom";
import defaultDp from "../../resources/default_coder.png";
import {Img} from 'react-image';

const List = ({coder, click}) => {

    // const profileUrl = `https://www.sololearn.com/Profile/${props.soloId}/?ref=app`;
    const profilePic = `https://api.sololearn.com/Uploads/Avatars/${coder.soloId}.jpg`;

    const dpNotFound = (img) => {
        img.src = {defaultDp}
    }

    return (
        <div className="list-container__list" onClick={click}>

            <div className="list-container__img-box">

                <Img className={`list-container__dp${coder.name.toLowerCase() === 'mitali' ? " " + coder.name.toLowerCase() : ''}`}
                    src={[profilePic, defaultDp]}
                    alt="dp" />

            </div>

            <div className="list-container__info-holder">
                <div className="list-container__name">{coder.name}</div>
                <div className="list-container__votes">{coder.votes} votes</div>
            </div>

            <Link className="list-container__more-btn" to={{
                pathname: `/details/${coder._id}`
            }}>
                <i className="ri-arrow-right-s-line"></i>
            </Link>

        </div >
    );
}

export default List;