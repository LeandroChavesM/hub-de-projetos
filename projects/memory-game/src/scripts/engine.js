const emojis = [
  "🐱",
  "🐱",
  "🐕",
  "🐕",
  "🦊",
  "🦊",
  "🐘",
  "🐘",
  "🦝",
  "🦝",
  "🦁",
  "🦁",
  "🐒",
  "🐒",
  "🐮",
  "🐮",
];

let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.onclick = handleClick;
  box.innerHTML = shuffleEmojis[i];
  document.querySelector(".game").appendChild(box);
}

let hasStarted = false;
let isGameOn = true;
let timeValue = 0;
const time = document.querySelector("#time");
time.textContent = "00:00";

function timeCount() {
  function update() {
    if (!isGameOn) return;
    timeValue++;
    const minutes = Math.floor(timeValue / 60);
    const seconds = timeValue % 60;
    time.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    setTimeout(() => requestAnimationFrame(update), 1000);
  }
  requestAnimationFrame(update);
}

function handleClick() {
  if (!hasStarted) {
    hasStarted = true;
    timeCount();
  }
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    isGameOn = false;
    alert("Você venceu!");
  }
}
