const score = document.querySelector(".Score");
const startscreen = document.querySelector(".StartScreen");
const gamearea = document.querySelector(".GameArea");
const carGame = document.querySelector(".CarGame");
let player = { speed: 5, score: 0 };
let highest = 0;
startscreen.addEventListener("click", start);

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
audio = new Audio("collide.mp3");
myaudio = new Audio("sound.mp3");
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
function keyDown(ev) {
  ev.preventDefault();
  keys[ev.key] = true;
}
function keyUp(ev) {
  ev.preventDefault();
  keys[ev.key] = false;
}
function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function endGame() {
  player.start = false;
  startscreen.classList.remove("hide");
  audio.play();
  setTimeout(() => {
    myaudio.pause();
  }, 200);

  setTimeout(() => {
    audio.pause();
  }, 3000);
}
function moveCar(car) {
  let other = document.querySelectorAll(".other");
  other.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y >= 1000) {
      item.y = -300;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
function gamePlay() {
  let car = document.querySelector(".car");
  let road = gamearea.getBoundingClientRect();

  if (player.start) {
    moveLines();
    moveCar(car);

    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < road.bottom - 100) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 70) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);

    player.score++;
    if (player.score == 1000) player.speed++;
    if (player.score == 2500) {
      player.speed++;
    }
    if (player.score == 5000) {
      player.speed++;
    }
    if (player.score == 10000) {
      player.speed++;
    }
    if (player.score == 20000) {
      player.speed++;
    }
    if (player.score == 40000) {
      player.speed++;
    }
    if (player.score == 70000) {
      player.speed++;
    }
    if (player.score == 100000) {
      player.speed += 2;
    }
    if (player.score == 150000) {
      player.speed += 2;
    }
    if (player.score == 200000) {
      player.speed += 2;
    }
    if (player.score >= highest) {
      highest = player.score;
    }
    score.innerHTML =
      "Your Score:" + player.score + "<br><br>" + "Highest Score:" + highest;
  }
}
function Reset() {
  highest = 0;
}
function start() {
  startscreen.classList.add("hide");
  gamearea.innerHTML = "";

  player.start = true;
  player.score = 0;
  myaudio.play();
  myaudio.loop = true;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 5; x++) {
    let roadline = document.createElement("div");
    roadline.setAttribute("class", "lines");
    roadline.y = x * 150;
    roadline.style.top = roadline.y + "px";
    gamearea.appendChild(roadline);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  gamearea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  for (x = 0; x < 3; x++) {
    let othercar = document.createElement("div");
    othercar.setAttribute("class", "other");
    othercar.y = (x + 1) * 350 * -1;
    othercar.style.top = othercar.y + "px";
    othercar.style.left = Math.floor(Math.random() * 330) + "px";
    gamearea.appendChild(othercar);
  }
}
