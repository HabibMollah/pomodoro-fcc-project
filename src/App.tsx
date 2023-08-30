import { useEffect, useState } from 'react';
import './App.css';
import msToMMSSConverter from './msToMMSSConverter';

export default function App() {
  const [time, setTime] = useState(25 * 60 * 1000);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
    }
  });

  return (
    <main>
      <section className="controls">
        <label id="break-label" htmlFor="break-length">
          Break Length
        </label>
        <div className="flex">
          <button id="break-decrement">-</button>
          <input disabled type="number" id="break-length" defaultValue={5} />
          <button id="break-increment">+</button>
        </div>
        <label id="session-label" htmlFor="session-length">
          Session Length
        </label>
        <div className="flex">
          <button
            onClick={() => setTime(time - 60 * 1000)}
            id="session-decrement">
            -
          </button>
          <input
            disabled
            type="number"
            id="session-length"
            value={time / 1000 / 60}
          />
          <button
            onClick={() => setTime(time + 60 * 1000)}
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
        <button onClick={() => setTime(25 * 60 * 1000)} id="reset">
          reset
        </button>
      </section>
    </main>
  );
}
