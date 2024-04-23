// Timer.js
import React, { useState, useEffect } from 'react';

function Timer({ select }) {
    const [timer, setTimer] = useState(10 * 60); // 10 minutes in seconds

    useEffect(() => {
        let interval;
        if (!select) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [select]);

    const formattedTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return <p className="timer">{formattedTime()}</p>;
}

export default Timer;
