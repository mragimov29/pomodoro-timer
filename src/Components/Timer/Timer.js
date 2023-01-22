import { useEffect, useState } from "react";
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
  const [timer, setTimer] = useState("10:00");
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimer(timerFunc(timer));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCounting, timer]);

  const startHandler = () => {
    setIsCounting(true);
  };

  const pauseHandler = () => {
    setIsCounting(false);
  }

  const selectMode = (e) => {
    document.querySelector("#selected").id = "";
    e.target.id = "selected";
    if (e.target.className === "short") {
      setTimer("05:00");
      colorChange("#16453e");
    } else if (e.target.className === "long") {
      setTimer("15:00");
      colorChange("#043b5c");
    } else if (e.target.className === "pomodoro") {
      setTimer("25:00");
      colorChange("#af4154");
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
    </div>
  );
}

export default Timer;
