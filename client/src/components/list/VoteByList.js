import React from 'react';

const VoteByList = ({dp, name, at}) => {
    return (
        <div className="votes__list">
            <img src={dp} alt="voter_dp" className="votes__dp" />

            <div className="votes__desc">
                <div className="votes__name">{name}</div>
                <div className="votes__time">{at}</div>
            </div>

        </div>
    );
}

export default VoteByList;