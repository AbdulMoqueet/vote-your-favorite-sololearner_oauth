import React from 'react';

const YoutubeBtn = () => {

    const openYoutube = () => {
        window.open('https://youtu.be/lSOyqjDIDAA', '_blank');
    }

    return (
        <div className="youtube-btn" onClick={openYoutube}> 
        <i className="ri-youtube-fill youtube-btn-icon"></i>My Youtube Channel
        </div>
    )
}

export default YoutubeBtn;