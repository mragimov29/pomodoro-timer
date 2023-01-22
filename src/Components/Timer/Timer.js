import { useState } from 'react';
import './Timer.css';

function Timer() {
  const [timer, setTimer] = useState('00:00');

  return (
    <div className="Timer">
        <div className='timer-chooser'>
            <button id='selected'>Pomodoro</button>
            <button>Short break</button>
            <button>Long break</button>
        </div>
        <p className='time-counter'>{timer}</p>
        <button className='start-pause-btn'>Start</button>
    </div>
  );
}

export default Timer;