const timerBtn = document.querySelectorAll(".timer__button");
const timeLeftDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const form = document.querySelector("form");
let intervalId = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const minutes = formData.get("minutes");
  const dataTime = minutes * 60;
  updateDisplay(dataTime);
  updateEndTime(dataTime);
  startCountdown(dataTime);
  e.target.reset();
});

timerBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const dataTime = Number(e.target.dataset.time);
    updateDisplay(dataTime);
    updateEndTime(dataTime);
    startCountdown(dataTime);
  });
});

function updateDisplay(totalSeconds) {
  const minute = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timeLeftDisplay.textContent = `${minute.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
}

function updateEndTime(seconds) {
  const currentTime = new Date().getTime();
  const endTime = new Date(currentTime + seconds * 1000);
  endTimeDisplay.textContent = `Be back at ${endTime
    .getHours()
    .toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}:${endTime.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
}

function startCountdown(seconds) {
  if (intervalId != null) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    seconds--;
    updateDisplay(seconds);
    if (seconds === 0) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 1000);
}
