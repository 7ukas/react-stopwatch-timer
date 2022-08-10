import React from 'react';

const CircularProgressBar = ({totalTime, timePassed}) => {
    const progress = timePassed / (totalTime / 406);

    return (
        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' className='start progress-bar-container'>
            <circle cx="75" cy="75" r="65" stroke-linecap="round" transform='rotate(-90 75 75)'
                style={{ strokeDashoffset: `${progress}` }}/>
        </svg>
    )
}

export default CircularProgressBar