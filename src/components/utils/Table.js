import React, { useEffect, useState } from 'react';
import moment from 'moment';

import './Table.css'
import exitImage from '../../images/exit.png';
import Clock from './Clock';

function Table({ header, rows, filter, actions, showRemainingTime, showPrice, dateFormat, callBackRemoveAction }) {

    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(moment())
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section className='custom-table'>
                <table>
                    <tr>
                        {header.map((header) => <th key={header}>{header}</th>)}
                    </tr>
                    {rows.map((customer) => {
                        if (filter && customer.playing === false) return null;   
                        let remainingTime = 0;
                        let remainingTimeStyle = '';
                        let timeHasFinished = false;
                        const endTime = moment(customer.start_time).add(customer.time, 'minutes');
                        if (endTime > currentTime) {
                            remainingTime = moment(endTime).diff(currentTime);
                            const remainingTimeMinutes = moment(remainingTime).format('mm');
                            const remainingTimePercentage = remainingTimeMinutes/customer.time;
                            remainingTimeStyle = remainingTimePercentage < 0.25 ? 'red' : 
                                remainingTimePercentage < 0.5 ? 'orange' : 
                                remainingTimePercentage < 0.75 ? 'yellow' : 
                                remainingTimePercentage < 1 ? 'green' : 'blue';
                        }
                        else {
                            remainingTime = currentTime.diff(endTime);
                            remainingTimeStyle = 'red';
                            timeHasFinished = true;
                        }
                        return (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.responsible}</td>
                            <td>{moment(customer.start_time).format(dateFormat)}</td>
                            <td>{customer.end_time ? moment(customer.end_time).format(dateFormat) : endTime.format(dateFormat)}</td>
                            {showRemainingTime &&
                                <td className={remainingTimeStyle}>{moment(remainingTime).format('mm:ss')}{timeHasFinished ? '- EXTRA' : null }</td>
                            }
                            {actions &&
                            <td style={{cursor: 'pointer'}}>
                                <a onClick={event => callBackRemoveAction(event, customer.id)}>
                                    <img src={exitImage} alt='exit' height={20}/>
                                </a>
                            </td>}
                            {showPrice && <td>{customer.price}</td>}
                            {showPrice && <td>{customer.payment_type}</td>}
                        </tr>)
                    })}
                </table>
            </section>
        </>
    )
}

export default Table