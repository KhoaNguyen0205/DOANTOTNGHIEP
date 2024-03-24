/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
    const [time, setTime] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const hours = currentTime.getHours();

            let currentGreeting = '';
            if (hours < 12) {
                currentGreeting = 'Good morning';
            } else if (hours < 18) {
                currentGreeting = 'Good afternoon';
            } else {
                currentGreeting = 'Good evening';
            }

            setGreeting(currentGreeting);
            setTime(currentTime.toLocaleTimeString());
        };

        const interval = setInterval(updateTime, 1000); // Update time every second
        updateTime(); // Initial update
        return () => clearInterval(interval); // Cleanup
    }, []);

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-time">
                   <div className='greeting'>
                     {greeting}
                   </div>
                </div>
                <div className='dashboard-body'>
                    <div className='dashboard-body-left'>
                        <div className='dashboard-body-left-top'>
                            <div className='left-top-item'>
                                <b>8</b>
                                <img src="https://cdn.dribbble.com/users/377441/screenshots/1683660/comp-1.gif" alt="" />
                            </div>
                            <div className='left-top-item'>
                                <b>8</b>
                                <img src="https://i.pinimg.com/originals/cb/17/b8/cb17b80a942d7c317a35ff1324fae12f.gif" alt="" />
                            </div>
                            <div className='left-top-item'>
                                <b>8</b>
                                <img src="https://www.yogiskitchen.ca/web_assets/ezgif.com-gif-maker4.gif" alt="" />
                            </div>
                            <div className='left-top-item'>
                                <b>8</b>
                                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-808_512.gif" alt="" />
                            </div>
                        </div>
                        <div className='dashboard-body-left-bottom'>
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className='dashboard-body-right'>

                    </div>
                </div>
            </div>
        </>
    );
}
