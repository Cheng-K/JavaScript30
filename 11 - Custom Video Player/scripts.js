const video = document.querySelector("video");

function addPlayBtnListener() {
  const playBtn = document.querySelector(
    ".player__controls button[title='Toggle Play']"
  );
  playBtn.addEventListener("click", (event) => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

function addFastForwardBtnListener() {
  const buttons = document.querySelectorAll(
    ".player__controls button[data-skip]"
  );
  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const forwardValue = Number(btn.getAttribute("data-skip") ?? "0");
      let newTime = Math.max(0, video.currentTime + forwardValue);
      newTime = Math.min(video.duration, newTime);
      video.fastSeek(newTime);
    });
  });
}

function addVolumeSliderListener() {
  const slider = document.querySelector(
    ".player__controls input[name='volume']"
  );
  slider.addEventListener("input", (event) => {
    video.volume = event.target.value;
  });
}

function addPlaybackRateSliderListener() {
  const slider = document.querySelector(
    ".player__controls input[name='playbackRate']"
  );
  slider.addEventListener("input", (event) => {
    video.playbackRate = event.target.value;
  });
}

function addVideoListener() {
  const progressbar = document.querySelector(".progress__filled");
  const playBtn = document.querySelector(
    ".player__controls button[title='Toggle Play']"
  );
  video.addEventListener("timeupdate", (event) => {
    const percentage = (event.target.currentTime / event.target.duration) * 100;
    progressbar.style["flex-basis"] = percentage + "%";
  });
  video.addEventListener("ended", (event) => {
    video.pause();
    video.fastSeek(0);
  });
  video.addEventListener("click", (event) => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
  video.addEventListener("play", (event) => {
    playBtn.textContent = "\u23F8";
  });
  video.addEventListener("pause", (event) => {
    playBtn.textContent = "\u23F5";
  });
}

function addProgressBarListener() {
  const progressbar = document.querySelector(".progress");
  let progressbarMouseDown = false;

  progressbar.addEventListener("click", (event) => {
    const seekTime = (event.offsetX / progressbar.offsetWidth) * video.duration;
    video.fastSeek(seekTime);
  });

  progressbar.addEventListener("mousemove", (event) => {
    if (progressbarMouseDown) {
      const seekTime =
        (event.offsetX / progressbar.offsetWidth) * video.duration;
      video.fastSeek(seekTime);
    }
  });
  progressbar.addEventListener("mousedown", (event) => {
    progressbarMouseDown = true;
  });
  progressbar.addEventListener("mouseup", (event) => {
    progressbarMouseDown = false;
  });
  progressbar.addEventListener("mouseout", (event) => {
    progressbarMouseDown = false;
  });
}

function addFullScreenBtnListener() {
  const button = document.querySelector(".player__controls .fullscreen");
  const player = document.querySelector(".player");
  button.addEventListener("click", (event) => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    player.requestFullscreen();
  });
}

addPlayBtnListener();
addFastForwardBtnListener();
addVolumeSliderListener();
addPlaybackRateSliderListener();
addVideoListener();
addProgressBarListener();
addFullScreenBtnListener();
