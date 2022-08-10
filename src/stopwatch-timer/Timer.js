import React from 'react';
import Numbers from './Numbers'
import Marks from './Marks'
import CircularProgressBar from './CircularProgressBar';
import AlarmSound from './../audio/alarm.mp3'

// Adds leading zero for time numbers
const addZero = (num, count) => String(num).padStart(count, '0')

const Timer = () => {
    // Timer
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(1);
    const [seconds, setSeconds] = React.useState(0);

    const [time, setTime] = React.useState((
        hours * 3600000) + (minutes * 60000) + (seconds * 1000)
    );
    const [timeLeftMs, setTimeLeft] = React.useState(time);

    // Audio, Flags
    const [alarm, setAlarm] = React.useState(new Audio(AlarmSound));
    const [isRunning, setIsRunning] = React.useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = React.useState(true);

    const timePassedMs = time - timeLeftMs;
    const intervalMs = 31 // ms
  
    // Changes time values according to inputs
    const changeTime = (e, timeType) => {
      let { value, min, max } = e.target;
      value = Math.max(Number(min), Math.min(Number(max), Number(value)));
  
      switch(timeType) {
        case 'h':
          setHours(value);
          break;
        case 'm':
          setMinutes(value);
          break;
        case 's':
          setSeconds(value);
          break;
      }
    }

    const resetTimer = (_time = time) => {
        setIsRunning(false);
        setTimeLeft(_time);
    }

    // Run the Timer (decreases time by 31ms on every trigger)
    React.useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - intervalMs)
            }, intervalMs)
        } else {clearInterval(interval)}

        return () => clearInterval(interval)
    }, [isRunning])
    
    // Once timer has finished: Stop and Play alarm sound
    if (isRunning && timeLeftMs < intervalMs) {
        setIsRunning(false);
        setTimeLeft(time);

        if (isSoundEnabled) {
            alarm.play();
        }
    }

    // Time values (etc)
    const timer = {
        initialTime: {
            hours: Math.floor((time / 3600000) % 24),
            minutes: Math.floor((time / 60000) % 60),
            seconds: Math.floor((time / 1000) % 60),
            milliseconds: Math.floor(time % 1000)
        },

        timeLeft: {
            hours: Math.floor((timeLeftMs / 3600000) % 24),
            minutes: Math.floor((timeLeftMs / 60000) % 60),
            seconds: Math.floor((timeLeftMs / 1000) % 60),
            milliseconds: Math.floor(timeLeftMs % 1000)
        },

        timePassed: {
            hours: Math.floor((timePassedMs / 3600000) % 24),
            minutes: Math.floor((timePassedMs / 60000) % 60),
            seconds: Math.floor((timePassedMs / 1000) % 60),
            milliseconds: Math.floor(timePassedMs % 1000)
        }
    };

    const clock = {
        handRotation: {
            hours: (timer.timeLeft.hours % 24 * 15) + (timer.timeLeft.minutes / 15),
            minutes: (timer.timeLeft.minutes % 60 * 6) + (timer.timeLeft.seconds / 10),
            seconds: (timer.timeLeft.seconds % 60 * 6) + (timer.timeLeft.milliseconds / (60 / .36))
        }
    }

    return (
        <>
        <div className='input-container'>
            <input type='number' className='input hours' min='0' max='23' value={hours} 
                onChange={(e) => changeTime(e, 'h')}/>
            <input type='number' className='input minutes' min='0' max='59' value={minutes}
                onChange={(e) => changeTime(e, 'm')}/>
            <input type='number' className='input seconds' min='0' max='59' value={seconds}
                onChange={(e) => changeTime(e, 's')}/>
            <div className='submit-btn-container'>
                <button className='button submit-btn' onClick={() => {
                    let time = (hours * 3600000) + (minutes * 60000) + (seconds * 1000)
                    setTime(time);
                    resetTimer(time);
                }}></button>
            </div>
        </div>

        <div className='time-container timer'>
            <h1>
                <span className='hours'>{addZero(timer.timeLeft.hours, 2)}:</span>
                <span className='minutes'>{addZero(timer.timeLeft.minutes, 2)}:</span>
                <span className='seconds-milliseconds'>
                    {addZero(timer.timeLeft.seconds, 2)}.{addZero(timer.timeLeft.milliseconds, 3)}
                </span>
            </h1>
            <h2>
                <span className='hours'>{addZero(timer.initialTime.hours, 2)}:</span>
                <span className='minutes'>{addZero(timer.initialTime.minutes, 2)}:</span>
                <span className='seconds-milliseconds'>
                    {addZero(timer.initialTime.seconds, 2)}.{addZero(timer.initialTime.milliseconds, 3)}
                </span>
                <span className='divider'>{'/'}</span>
                <span className='hours'>{addZero(timer.timePassed.hours, 2)}:</span>
                <span className='minutes'>{addZero(timer.timePassed.minutes, 2)}:</span>
                <span className='seconds-milliseconds'>
                    {addZero(timer.timePassed.seconds, 2)}.{addZero(timer.timePassed.milliseconds, 3)}
                </span>
            </h2>
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
                    <div>{timer.timeLeft.hours}</div>
                </div>

                <div className='circle minute' style={{ transform: `rotate(${clock.handRotation.minutes}deg)` }}>
                    <div>{timer.timeLeft.minutes}</div>
                </div>

                <div className='circle' style={{ transform: `rotate(${clock.handRotation.seconds}deg)` }}>
                    <div>{timer.timeLeft.seconds}</div>
                </div>

                <div className='start progress-bar-border'></div>
                
                <CircularProgressBar totalTime={time} timePassed={timePassedMs}/>

                <div className='start btn-bg'>
                    <input type='checkbox' className='checkbox start-checkbox' id='start-toggle-btn'
                        checked={isRunning}
                        onClick={() => {setIsRunning(!isRunning);}}
                        onChange={(e) => setIsRunning(e.target.checked)}
                    ></input>
                    <label for='start-toggle-btn' className='start-toggle-btn'></label>
                </div>
            </div>

            <div className='sound-btn-container'>
                <input type='checkbox' className='checkbox sound-checkbox' id='sound-toggle-btn'
                    checked={isSoundEnabled}
                    onClick={() => {
                        setIsSoundEnabled(!isSoundEnabled);
                        if (isSoundEnabled) { 
                            alarm.pause();
                            setAlarm(new Audio(AlarmSound));
                        }
                    }}
                    onChange={(e) => setIsSoundEnabled(e.target.checked)}
                ></input>
                <label for='sound-toggle-btn' className='toggle-btn sound-toggle-btn'></label>
            </div>
            
            <div className='reset-btn-container'>
                <button className='button reset-btn' onClick={() => {resetTimer()}}></button>
            </div>

        </div>
        </>
    );
}

export default Timer;