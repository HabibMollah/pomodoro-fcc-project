import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
  const [displayTime, setDisplayTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerOn, setTimerOn] = useState(false);
  const [timerId, setTimerId] = useState('Session');
  const audioElement = useRef<HTMLAudioElement>(null);
  const loop: undefined = undefined;

  const formatTime = (time: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let minutes: any = Math.floor(time / 60);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let seconds: any = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${minutes}:${seconds}`;
  };

  const changeTime = (amount: number, type: string) => {
    let newCount;
    if (type === 'Session') {
      newCount = sessionTime + amount;
    } else {
      newCount = breakTime + amount;
    }

    if (newCount > 0 && newCount <= 60 && !timerOn) {
      type === 'Session' ? setSessionTime(newCount) : setBreakTime(newCount);
      if (type === 'Session') {
        setDisplayTime(newCount * 60);
      }
    }
  };

  const setActive = () => {
    setTimerOn(!timerOn);
  };

  useEffect(() => {
    if (timerOn && displayTime > 0) {
      const interval = setInterval(() => {
        setDisplayTime(displayTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (displayTime === 0 && audioElement.current) {
      audioElement.current.play();
      audioElement.current.currentTime = 0;

      //    setTimeout(() => {
      if (timerId === 'Session') {
        setDisplayTime(breakTime * 60);
        setTimerId('Break');
      }
      if (timerId === 'Break') {
        setDisplayTime(sessionTime * 60);
        setTimerId('Session');
      }
    }
  }, [breakTime, sessionTime, displayTime, timerId, timerOn]);

  const resetTime = () => {
    setBreakTime(5);
    setSessionTime(25);
    setDisplayTime(1500);
    setTimerId('Session');
    setTimerOn(false);
    clearInterval(loop);
    if (audioElement.current) audioElement.current.load();
  };

  return (
    <main>
      <h1>Pomodoro Clock</h1>
      <p>
        by <a href="https://github.com/habibmollah">Habib Mollah</a>
      </p>
      <section className="controls">
        <label id="session-label" htmlFor="session-length">
          Session Length
        </label>
        <div className="flex">
          <button
            onClick={() => changeTime(-1, 'Session')}
            id="session-decrement">
            -
          </button>
          <input
            value={sessionTime}
            disabled
            type="number"
            id="session-length"
          />
          <button
            onClick={() => changeTime(1, 'Session')}
            id="session-increment">
            +
          </button>
        </div>
        <label id="break-label" htmlFor="break-length">
          Break Length
        </label>
        <div className="flex">
          <button onClick={() => changeTime(-1, 'Break')} id="break-decrement">
            -
          </button>
          <input value={breakTime} disabled type="number" id="break-length" />
          <button onClick={() => changeTime(1, 'Break')} id="break-increment">
            +
          </button>
        </div>
      </section>

      <section className="clock">
        <h2 id="timer-label">{timerId}</h2>
        <div id="time-left">{formatTime(displayTime)}</div>
      </section>

      <section className="start-stop-reset">
        <button onClick={setActive} id="start_stop">
          {timerOn ? 'pause' : 'start'}
        </button>
        <button onClick={resetTime} id="reset">
          reset
        </button>
      </section>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ref={audioElement}
      />
    </main>
  );
}
