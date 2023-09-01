import { useEffect, useRef, useState } from 'react';
import './App.css';
import msToMMSSConverter from './msToMMSSConverter';

export default function App() {
  const [sessionLength, setSessionLength] = useState(25 * 60 * 1000);
  const [breakLength, setBreakLength] = useState(5 * 60 * 1000);
  const [time, setTime] = useState(sessionLength);
  const [isStarted, setIsStarted] = useState(false);
  const beepRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!isStarted)
      return () => {
        return;
      };

    const timer =
      time > 0 &&
      setInterval(() => {
        setTime(time - 1000);
      }, 1000);

    return () => timer && clearInterval(timer);
  });

  useEffect(() => {
    setTime(sessionLength);
  }, [sessionLength]);

  return (
    <main>
      <audio
        ref={beepRef}
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
      <section className="controls">
        <label id="break-label" htmlFor="break-length">
          Break Length
        </label>
        <div className="flex">
          <button
            onClick={() => {
              if (!isStarted) {
                if (breakLength > 60 * 1000 && !isStarted)
                  setBreakLength(breakLength - 60 * 1000);
              }
            }}
            id="break-decrement">
            -
          </button>
          <input
            disabled
            type="number"
            id="break-length"
            value={Math.floor(breakLength / 1000 / 60)}
          />
          <button
            onClick={() => {
              if (!isStarted) setBreakLength(breakLength + 60 * 1000);
            }}
            id="break-increment">
            +
          </button>
        </div>
        <label id="session-label" htmlFor="session-length">
          Session Length
        </label>
        <div className="flex">
          <button
            onClick={() => {
              if (!isStarted) {
                if (sessionLength > 60 * 1000 && !isStarted)
                  setSessionLength(sessionLength - 60 * 1000);
              }
            }}
            id="session-decrement">
            -
          </button>
          <input
            disabled
            type="number"
            id="session-length"
            value={Math.floor(sessionLength / 1000 / 60)}
          />
          <button
            onClick={() => {
              if (!isStarted) setSessionLength(sessionLength + 60 * 1000);
            }}
            id="session-increment">
            +
          </button>
        </div>
      </section>

      <section className="clock">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">{msToMMSSConverter(time)}</div>
      </section>

      <section className="start-stop-reset">
        <button onClick={() => setIsStarted(!isStarted)} id="start_stop">
          start | stop
        </button>
        <button
          onClick={() => {
            setIsStarted(false);
            setSessionLength(25 * 60 * 1000);
            setTime(25 * 60 * 1000);
            setBreakLength(5 * 60 * 1000);
          }}
          id="reset">
          reset
        </button>
      </section>
    </main>
  );
}
