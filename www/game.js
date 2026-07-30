const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const size = 20;
const cells = 20;

canvas.width = size * cells;
canvas.height = size * cells;

let snake;
let food;
let dx;
let dy;
let score;
let timer;

function startGame() {
    snake = [
        {x: 10, y: 10},
        {x: 9, y: 10},
        {x: 8, y: 10}
    ];

    dx = 1;
    dy = 0;
    score = 0;

    createFood();

    clearInterval(timer);
    timer = setInterval(update, 120);
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * cells),
        y: Math.floor(Math.random() * cells)
    };
}

function update() {

    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= cells ||
        head.y >= cells
    ) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("scoreValue").innerText = score;
        createFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {

    ctx.fillStyle = "#222";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(
        food.x * size,
        food.y * size,
        size,
        size
    );

    snake.forEach((part,index)=>{
        ctx.fillStyle = index === 0 ? "#00ff00" : "#00aa00";

        ctx.fillRect(
            part.x * size,
            part.y * size,
            size,
            size
        );
    });
}

function gameOver(){
    clearInterval(timer);
    alert("Game Over! Ball: " + score);
}

document.getElementById("startBtn")
.onclick = startGame;


document.addEventListener("keydown", e=>{

    if(e.key==="ArrowUp" && dy!==1){
        dx=0; dy=-1;
    }

    if(e.key==="ArrowDown" && dy!==-1){
        dx=0; dy=1;
    }

    if(e.key==="ArrowLeft" && dx!==1){
        dx=-1; dy=0;
    }

    if(e.key==="ArrowRight" && dx!==-1){
        dx=1; dy=0;
    }

});
