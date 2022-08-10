import React from 'react';
import Stopwatch from './Stopwatch';
import Timer from './Timer';

const StopwatchTimer = () => {
    const [isStopwatch, setIsStopwatch] = React.useState(false);

    return (
      <div className='stopwatch-timer-container'>
        <div className='timer-switch-container'>
          <label className='switch btn-timer-switch'>
            <input type='checkbox' name='timer-switch' id='timer-switch' value='1'
              checked={isStopwatch}
              onClick={() => {setIsStopwatch(!isStopwatch);}}
              onChange={(e) => setIsStopwatch(e.target.checked)}/>
            <label for='timer-switch' data-on='Timer' data-off='Stopwatch' className='btn-timer-switch-inner'></label>
          </label>
        </div>

        {!isStopwatch && <div><Stopwatch/></div>}
        {isStopwatch && <div><Timer/></div>}
      </div>
    )
}

export default StopwatchTimer