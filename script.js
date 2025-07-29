const html = document.querySelector("html");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseButton = document.querySelector("#start-pause");
const startPauseButtonText = document.querySelector("#start-pause span");
const startPauseButtonIcon = document.querySelector(
  ".app__card-primary-button-icon"
);
const screenTime = document.querySelector("#timer");
const focusButton = document.querySelector(".app__card-button--foco");
const shortBreak = document.querySelector(".app__card-button--curto");
const longBreak = document.querySelector(".app__card-button--longo");

let studyTimeInSeconds = 1500;
let idInterval = null;

const focusMusicInput = document.querySelector("#alternar-musica");
const music = new Audio("./sons/luna-rise-part-one.mp3");
music.loop = true;

focusMusicInput.addEventListener("change", () => {
  if (focusMusicInput.checked) {
    music.play();
  } else {
    music.pause();
    music.currentTime = 0;
  }
});

function alterarContexto(contexto) {
  showtimer();
  buttons.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
      break;
    case "descanso-curto":
      title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `;
      break;
    case "descanso-longo":
      title.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `;
    default:
      break;
  }
}

focusButton.addEventListener("click", () => {
  studyTimeInSeconds = 1500;
  clear();
  alterarContexto("foco");
  focusButton.classList.add("active");
});

shortBreak.addEventListener("click", () => {
  studyTimeInSeconds = 300;
  clear();
  alterarContexto("descanso-curto");
  shortBreak.classList.add("active");
});

longBreak.addEventListener("click", () => {
  studyTimeInSeconds = 900;
  clear();
  alterarContexto("descanso-longo");
  longBreak.classList.add("active");
});

const beep = new Audio("./sons/beep.mp3");
const play = new Audio("./sons/play.wav");
const pause = new Audio("./sons/pause.mp3");

const remainingTime = () => {
  if (studyTimeInSeconds <= 0) {
    beep.play();
    alert("Tempo esgotado!");
    clear();
    return;
  }
  studyTimeInSeconds -= 1;
  showtimer();
};

startPauseButton.addEventListener("click", startPause);

function startPause() {
  if (idInterval) {
    pause.play();
    clear();
    return;
  }
  play.play();
  idInterval = setInterval(remainingTime, 1000);
  startPauseButtonText.textContent = "Pausar";
  startPauseButtonIcon.setAttribute("src", "./imagens/pause.png");
}

function clear() {
  clearInterval(idInterval);
  startPauseButtonText.textContent = "Começar";
  startPauseButtonIcon.setAttribute("src", "./imagens/play_arrow.png");
  idInterval = null;
}

function showtimer() {
  const timer = new Date(studyTimeInSeconds * 1000);
  const formatedTimer = timer.toLocaleString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  screenTime.innerHTML = `${formatedTimer}`;
}

showtimer();
