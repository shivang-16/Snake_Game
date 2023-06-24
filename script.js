//Sounds
let themeMusic = new Audio("theme.mp3");
let eatSound = new Audio("eat.ogg");
let gameOverMusic = new Audio("over.wav");
// Initializing directions
let direction = { x: 0, y: 0 };
let snakeArray = [{ x: 10, y: 12 }];
let foodPosition = { x: 7, y: 9 };
let initialTime = 0;
let snakeVelocity = { x: 0, y: 0 };

let startGame = document.getElementById("startGame");

startGame.addEventListener("click", () => {
  setInterval(() => {
    themeMusic.play();
  }, 500);

  // themeMusic.play();
  PopOver.style.display = "none";
  let speed = parseFloat(speedBox.value);
  const frames = (currTime) => {
    window.requestAnimationFrame(frames);
    if ((currTime - initialTime) / 1000 <= 1 / speed) {
      return;
    } else {
      initialTime = currTime;
    }

    gameLogic();
  };
  window.requestAnimationFrame(frames);
});

//collided function
const isCollided = () => {
  for (let i = 1; i < snakeArray.length; i++) {
    //if snake head has collided with its body
    if (
      snakeArray[i].x === snakeArray[0].x &&
      snakeArray[i].y === snakeArray[0].y
    ) {
      return true;
    }
  }

  // if snake head has collided with the walls
  if (
    snakeArray[0].x > 19 ||
    snakeArray[0].x <= 0 ||
    snakeArray[0].y > 18 ||
    snakeArray[0].y <= 0
  ) {
    return true;
  }
  return false;
};

let arena = document.getElementById("arena");

const gameLogic = () => {
  // Part 1 -> Display Snake
  arena.innerHTML = "";
  snakeArray.forEach((e, index) => {
    let snake = document.createElement("div");
    snake.style.gridRowStart = e.y;
    snake.style.gridColumnStart = e.x;
    if (index === 0) {
      snake.classList.add("head");
    } else {
      snake.classList.add("body");
    }
    arena.appendChild(snake);
  });

  // Part 2 -> Display Snake food
  let snakeFood = document.createElement("div");
  snakeFood.style.gridRowStart = foodPosition.y;
  snakeFood.style.gridColumnStart = foodPosition.x;
  snakeFood.classList.add("food");
  arena.appendChild(snakeFood);

  //part 3->Controls for game

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snakeVelocity = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        snakeVelocity = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        snakeVelocity = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        snakeVelocity = { x: 1, y: 0 };
        break;
      default:
        break;
    }
  });

  //Part 4-> If food is eaten by snake

  if (snakeArray[0].x == foodPosition.x && snakeArray[0].y == foodPosition.y) {
    eatSound.play();
    // 1> add one more box to snake
    snakeArray.unshift({
      x: (snakeArray[0].x + snakeVelocity.x),
      y: (snakeArray[0].y + snakeVelocity.y),
    });

    //2> updated the food position
    let a = 1;
    let b = 17;
    foodPosition = {
      x: Math.floor(Math.random() * b - a + 1) + a,
      y: Math.floor(Math.random() * b - a + 1) + a,
    };
  }

  //Part 5> update the score
  let count = 0;
  count = snakeArray.length - 1;
  foodCount.innerHTML = count;
  let score = count * 10;

  let highScore = localStorage.getItem("value");
  if (score >= highScore) {
    localStorage.setItem(`value`, score);
    highScore = score;
  }
  scoreCount.innerHTML = score;
  highscoreCount.innerHTML = highScore;

  reset.addEventListener("click", () => {
    localStorage.clear();
  });

  //Part 6-> Moving snake
  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }
  snakeArray[0].x += snakeVelocity.x;
  snakeArray[0].y += snakeVelocity.y;

  //Part 7> If snake is collided
  if (isCollided()) {
    themeMusic.pause();
    gameOverMusic.play();
    snakeVelocity = { x: 0, y: 0 };
    snakeArray = [{ x: 10, y: 12 }];
    score = 0;
    winPopover.style.display = "block";
  }
};

// To pause the snake
let pause = document.getElementById("pause");
pause.addEventListener("click", () => {
  snakeVelocity = { x: 0, y: 0 };
  pause.innerText = "Press any key";
});

let PopOver = document.querySelector(".popover-background");
let popover = document.querySelector(".popover");
PopOver.style.display = "none";
setTimeout(() => {
  PopOver.style.display = "block";
  popover.classList.add("show-popover");
}, 500);

let Playagain = document.getElementById("play-again");
let winPopover = document.querySelector(".win-popover-background");
Playagain.addEventListener("click", () => {
  winPopover.style.display = "none";
});
