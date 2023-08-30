import { useState } from 'react';
import './App.css';
import msToMMSSConverter from './msToMMSSConverter';

export default function App() {
  const [time, setTime] = useState(60 * 60 * 1000);

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
          <button id="session-decrement">-</button>
          <input disabled type="number" id="session-length" defaultValue={25} />
          <button id="session-increment">+</button>
        </div>
      </section>

      <section className="clock">
        <h2 id="timer-label">Session</h2>
        <div id="time-left">25:00</div>
      </section>

      <section className="start-stop-reset">
        <button id="start_stop">start | stop</button>
        <button id="reset">reset</button>
      </section>
    </main>
  );
}
