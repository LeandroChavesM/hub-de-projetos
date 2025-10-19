const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lifes: document.querySelector("#lifes"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lifes: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0 || state.values.lifes <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Seu jogo acabou! Seu resultado foi: " + state.values.result);
  }
}

function playSound() {
  let audio = new Audio("./src/audios/hit.m4a");
  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function currentLifes() {
  state.view.lifes.textContent = state.values.lifes;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        playSound();
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
      } else {
        state.values.lifes--;
        currentLifes();
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  currentLifes();
}

initialize();
