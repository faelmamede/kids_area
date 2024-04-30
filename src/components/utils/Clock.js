import React, { useEffect, useState } from 'react';

import './Clock.css'
import moment from 'moment';

function Clock(props) {
    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment().format('HH:mm:ss'))
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='clock'>
            <h1>{currentTime}</h1>
        </div>
    )
}

export default Clock