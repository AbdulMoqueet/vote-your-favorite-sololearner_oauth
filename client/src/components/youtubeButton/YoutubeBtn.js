import React from 'react';

const YoutubeBtn = () => {

    const openYoutube = () => {
        window.location.href = 'https://youtu.be/lSOyqjDIDAA';
    }

    return (
        <div className="youtube-btn" onClick={openYoutube}> 
        <i className="ri-youtube-fill youtube-btn-icon"></i>My Youtube Channel
        </div>
    )
}

export default YoutubeBtn;