const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const audio = document.getElementById("audio-capitulo");
const capitulo = document.getElementById("capitulo");
const qtdCapitulos = 10;

let taTocando = false;
let capituloAtual = 1;

function tocarMusica() {
  console.log("tocou");

  audio.play();
  taTocando = true;

  botaoPlayPause.classList.add("tocando");
}

function pausarMusica() {
  console.log("pausou");

  audio.pause();
  taTocando = false;

  botaoPlayPause.classList.remove("tocando");
}

function proximoCapitulo() {
  pausarMusica();

  if (capituloAtual < qtdCapitulos) {
    capituloAtual += 1;
  } else {
    capituloAtual = 1;
  }

  audio.src = "./audios/" + capituloAtual + ".mp3";
  capitulo.innerText = "Capitulo " + capituloAtual;
}

function capitulAnterior() {
  pausarMusica();

  if (capituloAtual === 1) {
    capituloAtual = qtdCapitulos;
  } else {
    capituloAtual = capituloAtual - 1;
  }

  audio.src = "./audios/" + capituloAtual + ".mp3";
  capitulo.innerText = "Capitulo " + capituloAtual;
}

function tocarOuPausar() {
  if (taTocando === false) {
    tocarMusica();
  } else {
    pausarMusica();
  }
}

botaoPlayPause.addEventListener("click", tocarOuPausar);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
botaoCapituloAnterior.addEventListener("click", capitulAnterior);
