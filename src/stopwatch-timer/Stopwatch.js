import React from 'react';
import Numbers from './Numbers'
import Marks from './Marks'
import CircularProgressBar from './CircularProgressBar';
import AlarmSound from './../audio/alarm.mp3'

// Adds leading zero for time numbers
const addZero = (num, count) => String(num).padStart(count, '0')

const Stopwatch = () => {
    // Stopwatch, Flags
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);

    const intervalMs = 31 // ms

    const resetStopwatch = () => {
        setIsRunning(false);
        setTime(0);
    }

    // Run the Stopwatch (increases time by 31ms on every trigger)
    React.useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + intervalMs)
            }, intervalMs)
        } else {clearInterval(interval)}

        return () => clearInterval(interval)
    }, [isRunning])
    
    // Once stopwatch reaches 24hr mark: Reset Stopwatch
    if (time >= 86399000) { resetStopwatch(); }

    // Time values (etc)
    const stopwatch = {
        time: {
            hours: Math.floor((time / 3600000) % 24),
            minutes: Math.floor((time / 60000) % 60),
            seconds: Math.floor((time / 1000) % 60),
            milliseconds: Math.floor(time % 1000)
        }
    };

    const clock = {
        handRotation: {
            hours: (stopwatch.time.hours % 24 * 15) + (stopwatch.time.minutes / 15),
            minutes: (stopwatch.time.minutes % 60 * 6) + (stopwatch.time.seconds / 10),
            seconds: (stopwatch.time.seconds % 60 * 6) + (stopwatch.time.milliseconds / (60 / .36))
        }
    }

    return (
        <>
        <div className='time-container stopwatch'>
            <h1>
                <span className='hours'>{addZero(stopwatch.time.hours, 2)}:</span>
                <span className='minutes'>{addZero(stopwatch.time.minutes, 2)}:</span>
                <span className='seconds-milliseconds'>
                    {addZero(stopwatch.time.seconds, 2)}.{addZero(stopwatch.time.milliseconds, 3)}
                </span>
            </h1>
        </div>

        <div className='outer-clock'>
            <Numbers/>
            
            <div className='clock'>
                <div className='inner-face face1'></div>
                <div className='inner-face face2'></div>

                <Marks/>

                <div className='hand hour' style={{ 
                    transform: `rotate(${clock.handRotation.hours}deg)`
                }}></div>
                <div className='hand minute' style={{ 
                    transform: `rotate(${clock.handRotation.minutes}deg)`
                }}></div>

                <div className='hand second' style={{ 
                    transform: `rotate(${clock.handRotation.seconds}deg)`
                }}></div>

                <div className='circle hour' style={{ transform: `rotate(${clock.handRotation.hours}deg)` }}>
                    <div>{stopwatch.time.hours}</div>
                </div>

                <div className='circle minute' style={{ transform: `rotate(${clock.handRotation.minutes}deg)` }}>
                    <div>{stopwatch.time.minutes}</div>
                </div>

                <div className='circle' style={{ transform: `rotate(${clock.handRotation.seconds}deg)` }}>
                    <div>{stopwatch.time.seconds}</div>
                </div>

                <div className='start progress-bar-border'></div>
                <div className='start progress-bar-container'></div>

                <div className='start btn-bg'>
                    <input type='checkbox' className='checkbox start-checkbox' id='start-toggle-btn'
                        checked={isRunning}
                        onClick={() => {setIsRunning(!isRunning);}}
                        onChange={(e) => setIsRunning(e.target.checked)}
                    ></input>
                    <label for='start-toggle-btn' className='start-toggle-btn'></label>
                </div>
            </div>
        
            <div className='reset-btn-container'>
                <button className='button reset-btn' onClick={() => {resetStopwatch()}}></button>
            </div>

        </div>
        </>
    );
}

export default Stopwatch;