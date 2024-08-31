let gameSeq = [];
let playerSeq = [];

let buttons = ['btn1', 'btn2', 'btn3', 'btn4'];

let started = false;
let level = 0;
let h2 = document.getElementById('scorecard');

// Event listener listens to any key pressed on the keyboard and starts the game
document.addEventListener('keydown', startGame);

// once game starts, we level up from 0 to 1
function startGame(){
    if (started == false){
        started = true;
        levelUp();
    }
}

// Once you level up, a random btn is added to game sequence and player sequence starts from scratch
function levelUp(){
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randId = buttons[randIdx];
    let randBtn = document.getElementById(randId);
    gameSeq.push(randBtn.id);
    playerSeq = [];
    flashBtn(randBtn);
}

// The button added to game sequence is flashed to user
function flashBtn(btn){
    btn.classList.add('scale-110');
    setTimeout(() => btn.classList.remove('scale-110'), 250 );
}

// The game is constantly listening to any button you press, and calls btnPress fxn
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

// Once a button is pressed, it is flashed, pushed into player sequence, and checked for validity
function btnPress(){
    let btn = this;
    flashUser(btn);
    playerSeq.push(btn.id);
    checkBtn(playerSeq.length - 1);
}


function flashUser(btn){
    btn.classList.add('scale-90');
    setTimeout(() => btn.classList.remove('scale-90'), 250 );
}

function checkBtn(idx){
    if (playerSeq.length == gameSeq.length){
        setTimeout(levelUp, 1000); // if all buttons pressed right
    }
    if (playerSeq[idx] != gameSeq[idx]){ // if you make a mistake, game will initialise
        h2.innerHTML = `Game Over!!! Your Score is ${level - 1} <br>Press any key to start over!`;
        initialiseGame();
    }
}

function initialiseGame(){
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => document.querySelector("body").style.backgroundColor = "white", 150);
    started = false;
    level = 0;
    playerSeq = [];
    gameSeq = [];
}

