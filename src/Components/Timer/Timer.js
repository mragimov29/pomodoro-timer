import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./Timer.css";

const colorChange = (color) => {
  document.querySelector(".Timer").style.backgroundColor = color;
  document.querySelector(".start-pause-btn").style.color = color;
  document
    .querySelector(".timer-chooser")
    .querySelectorAll("button")
    .forEach((e) => {
      e.style.backgroundColor = color;
    });
};

const timerFunc = (timer) => {
  let x = timer.split(":");
  if (x[1] === "00") {
    x[0] = `${(x[0] -= 1)}`;
    x[1] = "59";
    if (x[0] < 10) x[0] = "0" + x[0];
  } else {
    x[1] = `${(x[1] -= 1)}`;
    if (x[1] < 10) x[1] = "0" + x[1];
  }

  return `${x[0]}:${x[1]}`;
};

function Timer() {
  const [pomodoroTimer, setPomodoroTimer] = useState("20:00");
  const [timer, setTimer] = useState(pomodoroTimer);
  const [shortBreak, setShortBreak] = useState("10:00");
  const [longBreak, setLongBreak] = useState("30:00");
  const [pomodoroTimerInput, setPomodoroTimerInput] = useState(
    pomodoroTimer.slice(0, -3)
  );
  const [shortBreakInput, setShortBreakInput] = useState(
    shortBreak.slice(0, -3)
  );
  const [longBreakInput, setLongBreakInput] = useState(longBreak.slice(0, -3));
  const [counter, setCounter] = useState(0);
  const [pauseCounter, setPauseCounter] = useState(0);
  const [intervalPause, setIntervalPause] = useState(2);
  const [intervalPauseInput, setIntervalPauseInput] = useState(intervalPause);
  const [isCounting, setIsCounting] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    if (timer === "00:00") {
      if (
        document.querySelector("#selected").className === "pomodoro" &&
        pauseCounter < 2
      ) {
        document.querySelector("#selected").id = "";
        setCounter(counter + 1);
        setPauseCounter(pauseCounter + 1);
        document.querySelector(".short").id = "selected";
        setTimer(shortBreak);
        colorChange("#16453e");
      } else if (
        document.querySelector("#selected").className === "pomodoro" &&
        pauseCounter >= 2
      ) {
        document.querySelector("#selected").id = "";
        setCounter(counter + 1);
        setPauseCounter(0);
        document.querySelector(".long").id = "selected";
        setTimer(longBreak);
        colorChange("#043b5c");
      } else if (
        document.querySelector("#selected").className === "short" ||
        document.querySelector("#selected").className === "long"
      ) {
        document.querySelector("#selected").id = "";
        document.querySelector(".pomodoro").id = "selected";
        setTimer(pomodoroTimer);
        colorChange("#af4154");
      }
    } else {
      const interval = setInterval(() => {
        isCounting && setTimer(timerFunc(timer));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCounting, timer, shortBreak, longBreak, pomodoroTimer]);

  const startHandler = () => {
    setIsCounting(true);
  };

  const pauseHandler = () => {
    setIsCounting(false);
  };

  const selectMode = (e) => {
    document.querySelector("#selected").id = "";
    e.target.id = "selected";
    if (e.target.className === "short") {
      setTimer(shortBreak);
      colorChange("#16453e");
    } else if (e.target.className === "long") {
      setTimer(longBreak);
      colorChange("#043b5c");
    } else if (e.target.className === "pomodoro") {
      setTimer(pomodoroTimer);
      colorChange("#af4154");
    }
  };

  const shortBreakChange = (e) => {
    setShortBreakInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const pomodoroTimerChange = (e) => {
    setPomodoroTimerInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const longBreakChange = (e) => {
    setLongBreakInput(e.target.value.replace(/[^0-9]/g, ""));
  };
  const intervalChange = (e) => {
    setIntervalPauseInput(e.target.value.replace(/[^0-9]/g, ""))
  }

  const cancelHandler = () => {
    setModalActive(false);
    setLongBreakInput(longBreak.slice(0, -3));
    setShortBreakInput(shortBreak.slice(0, -3));
    setPomodoroTimerInput(pomodoroTimer.slice(0, -3));
    setIntervalPauseInput(intervalPause);
  };

  const okHandler = () => {
    setModalActive(false);
    setIntervalPause(intervalPauseInput);
    if (longBreakInput < 10) setLongBreak("0" + longBreakInput + ":00");
    else setLongBreak(longBreakInput + ":00");
    if (shortBreakInput < 10) setShortBreak("0" + shortBreakInput + ":00");
    else setShortBreak(shortBreakInput + ":00");
    if (pomodoroTimerInput < 10)
      setPomodoroTimer("0" + pomodoroTimerInput + ":00");
    else setPomodoroTimer(pomodoroTimerInput + ":00");
    if (!isCounting) {
      if (document.querySelector("#selected").className === "pomodoro") {
        if (pomodoroTimerInput < 10) setTimer("0" + pomodoroTimerInput + ":00");
        else setTimer(pomodoroTimerInput + ":00");
      } else if (document.querySelector("#selected").className === "long") {
        if (longBreakInput < 10) setTimer("0" + longBreakInput + ":00");
        else setTimer(longBreakInput + ":00");
      } else if (document.querySelector("#selected").className === "short") {
        if (shortBreakInput < 10) setTimer("0" + shortBreakInput + ":00");
        else setTimer(shortBreakInput + ":00");
      }
    }
  };

  return (
    <div className="Timer">
      <div className="timer-chooser">
        <button className="pomodoro" id="selected" onClick={selectMode}>
          Pomodoro
        </button>
        <button className="short" onClick={selectMode}>
          Short break
        </button>
        <button className="long" onClick={selectMode}>
          Long break
        </button>
        <button onClick={() => setModalActive(true)}>
          <img
            className="setting-img"
            alt="setting"
            src="https://upload.wikimedia.org/wikipedia/commons/5/58/Ic_settings_48px.svg"
          ></img>
        </button>
      </div>
      <p className="time-counter">{timer}</p>
      {!isCounting ? (
        <button className="start-pause-btn" onClick={startHandler}>
          Start
        </button>
      ) : (
        <button className="start-pause-btn" onClick={pauseHandler}>
          Pause
        </button>
      )}
      <h1>#{counter}</h1>
      <Modal active={modalActive} setActive={setModalActive}>
        <div className="settings">
          <h2>Settings</h2>
          <label>
            Pomodoro:
            <input
              value={pomodoroTimerInput}
              onChange={pomodoroTimerChange}
            ></input>
          </label>
          <label>
            Short break:
            <input value={shortBreakInput} onChange={shortBreakChange}></input>
          </label>
          <label>
            Long break:
            <input value={longBreakInput} onChange={longBreakChange}></input>
          </label>
          <label>
            Long break interval:
            <input value={intervalPauseInput} onChange={intervalChange}></input>
          </label>
          <div className="modal-btns">
            <button
              className="ok-button"
              disabled={
                Number(longBreakInput) === 0 ||
                Number(shortBreakInput) === 0 ||
                Number(pomodoroTimerInput) === 0 ||
                Number(intervalPauseInput) === 0
                  ? true
                  : false
              }
              onClick={okHandler}
            >
              OK
            </button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Timer;
