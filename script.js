// Initializing directions
let direction = { x: 0, y: 0 };
let snakeArray = [{ x: 10, y: 12 }];
let foodPosition = { x: 7, y: 9 };
let speed = 10;
let initialTime = 0;
let snakeVelocity = { x: 0, y: 0 };

const frames = (currTime) => {
  window.requestAnimationFrame(frames);
  if ((currTime - initialTime) / 1000 <= 1 / speed) {
    return;
  } else {
    initialTime = currTime;
  }

  gameLogic();;
};

window.requestAnimationFrame(frames);

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



 if(snakeArray[0].x == foodPosition.x && snakeArray[0].y == foodPosition.y){
  
  // 1> add one more box to snake
   snakeArray.push({
    x:snakeArray[0].x += snakeVelocity.x,
    y:snakeArray[0].y += snakeVelocity.y
   })

  
  //2> updated the food position
  let a = 1;
  let b = 17;
  foodPosition ={
    x:Math.floor(Math.random()* b-a+1)+a,
    y:Math.floor(Math.random()* b-a+1)+a  }

  console.log(foodPosition);
 }

//Part 5-> Moving snake
for (let i = snakeArray.length-2 ; i>=0 ; i--) {
  snakeArray[i+1]={...snakeArray[i]}//creates a copy of [i+1] and assing to [i] to avoid refernce problem
}
 snakeArray[0].x += snakeVelocity.x;
 snakeArray[0].y += snakeVelocity.y;

 //Part 6> If snake is collided
 let gridstart ={x:0 ,y:0}
 let gridend = {x:18, y:18}
 if(snakeArray[0]==gridstart.x || snakeArray[0]==gridstart.y || snakeArray[0]==gridend.x || snakeArray[0]==gridend.y){
    console.log("snake collided")
    snakeVelocity={x:0,y:0}
 }


}
//To pause the snake

  let pause=document.getElementById('pause')
  pause.addEventListener('click', ()=>{
  snakeVelocity = { x: 0, y: 0 };
  })




console.log(snakeArray);
