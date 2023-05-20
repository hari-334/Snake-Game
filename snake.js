let playBoard = document.querySelector(".gameBoard");
let ScoreBoard = document.querySelector(".score");
let highScoreBoard = document.querySelector(".highScore");
let timeValue = document.querySelector(".tValue");
let controls = document.querySelectorAll(".controls i");
let c = document.getElementsByClassName(".controls");
const sequenceBox = document.querySelector(".sequence");

let timeLeft=60,startTime,endTime;
let s = 59;

const leaderBox = document.querySelector(".leadeBoard");
let leaderList = JSON.parse(localStorage.getItem("leaderBoard"));
if (leaderList === null || leaderList == []){
    leaderList = [];
    for(let i=0; i<10; i++){
        leaderList.push([0, "Guest"]);
    }
    localStorage.setItem("leaderBoard", JSON.stringify(leaderList));
}
let username = prompt("Please Enter The Name You Want To Play In??","Guest");


let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
highScoreBoard.textContent = `High Score: ${highScore}`;

let snakeX = 3;
let snakeY = 1;

let foodX, foodY;
let foodX2, foodY2;
let foodX3, foodY3;
let foodX4, foodY4;
let food = [[foodX,foodY],[foodX2,foodY2],[foodX3,foodY3],[foodX4,foodY4]];
let numberOfFood = [1,2,3,4];
 
let speedX = 0;
let speedY = 0;

let gameOver = false;
let setIntervalId;

let d = 0;
/*const ifAlreadyPresent = (a, b) => {
    for (let i = 0; i < b.length; i++){
        if(a[0] == b[i].x && a[1] == b[i].y){
            return true;
        }
    }
    return false;
}*/

let snakeBody = [
    {x:3, y:1},
    {x:2, y:1},
    {x:1, y:1}
];
function shuffleArray(arr){
    for(let i=arr.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function colorSequence(colors){
    //const shuffledColors = shuffleArray(colors);
    for(let i=0; i<colors.length; i++){
        const sequenceBlock = document.createElement("div");
        sequenceBlock.classList.add("sequenceBlock");
        sequenceBlock.style.backgroundColor = colors[i];
        sequenceBox.appendChild(sequenceBlock);
    }
    
}
function generateFoodColors(colors){
    const shuffledColors = shuffleArray(colors);
    /*for(let i=0; i<shuffledColors.length; i++){
        const colorCell = document.createElement('div');
        colorCell.classList.add('colorCell');
        colorCell.style.backgroundColor = shuffledColors[i];
        playBoard.appendChild(colorCell);

    }*/
    for(let i=o; i<shuffledColors.length; i++){
        console.log("hii")
    }
}

function snakeMovement(){
    if(d){
        for(let i = snakeBody.length-2; i>=0; i-=1){
            snakeBody[i+1] = {...snakeBody[i]};
        }
        snakeBody[0].x += speedX;
        snakeBody[0].y += speedY;

    }

}
function updateScore(){
    if(foodX == snakeBody[0].x && foodY == snakeBody[0].y){
        changeFoodPosition();
        score += 1;
        if (score >= highScore){
            highScore = score;
        }
        localStorage.setItem("highScore",highScore);
        ScoreBoard.textContent = `Score: ${score}`;
        highScoreBoard.textContent = `High Score: ${highScore}`;

    }

}
function displayGameOver(){
    leaderList.push([score, username]);
    leaderList.sort((a,b) => {return  a[0] - b[0]});
    leaderList.reverse();
    leaderList.pop();
    localStorage.setItem("leaderBoard", JSON.stringify(leaderList));
    clearInterval(setIntervalId);
    alert("Game Over!!! Try Again :(");
    location.reload();

    
}
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
    return foodX, foodY;

}
function generateFood(){
    function randcreate(){
        let num = Math.floor(Math.random()*30) + 1;
        return num;
    }
    foodX = randcreate();
    foodX2 = randcreate();
    foodX3 = randcreate();
    foodY = randcreate();
    foodY2 = randcreate();
    foodY3 = randcreate();
    foodX4 = randcreate();
    foodY4 = randcreate();
    food = [
        [foodX,foodY], 
        [foodX2,foodY2], 
        [foodX3,foodY3],
        [foodX4,foodY4]
    ];
    numberOfFood = [1,2,3,4];
}
function updateFoodPosition(){
    let foodHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;    
    
    foodHTML += `<div class="snake" style=" grid-area: ${snakeBody[0].y} / ${snakeBody[0].x}"></div>`;
    foodHTML+=`<div class="snake" style=" grid-area: ${snakeBody[1].y} / ${snakeBody[1].x}"></div>`;
    foodHTML+=`<div class="snake" style=" grid-area: ${snakeBody[2].y} / ${snakeBody[2].x}"></div>`;

    playBoard.innerHTML = foodHTML;
    /*for(let i=0; i<3;i++){
        const coll = document.createElement("div");
        coll.classList.add("color-cell");
        coll.style.gridArea = snakeBody[i].y / snakeBody[i].x ;
        coll.style.backgroundColor = "white";
        playBoard.appendChild(coll);
    }*/

}
/*const updateFoodPosition = () =>{
    while(food1.length < 5){
        foodX = Mah.floor(Math.random()*30) + 1;
        foodY = Math.floor(Math.random()*30) + 1;

        if (ifAlreadyPresent([foodX, foodY],food2) || ifAlreadyPresent([foodX, foodY],snakeBody) || (foodX == snakeX && foodY == snakeY)){
            continue;
        }
        else{
            food1.push({x: foodX, y: foodY});
            food2.push({x: foodX, y: foodY});
        }

    }
    food.forEach((element, index) => {
        element.push(index);
        food.splice(index,1,element);
    });
    let html ="";
    food.forEach((element, index) => {
        html += `<div class ="food${element[2]+ 1}tile" style="grid-area: ${element.y}/${element.x}"></div>`;
    });
    sequenceBlock.innerHTML = html;

}*/
foodPosition = () => {
    if(timeLeft != 60){
        endTime = new Date();
        duration=(endTime-startTime)/1000;
        startTime = new Date();
        timeLeft -= duration;        
        let time = Math.round(timeLeft);
        timeValue.innerHTML = `${time}`;
        if(time<0){
            displayGameOver();
        }
    }

    if(gameOver) {
        return displayGameOver();
    }
    
    //updateFoodPosition();
    /*let html = "";
    for (let i=0; i<food.length;i+=1){
        html += `<div class="food$
    }
    */
    let html = "";
    for(let i=0; i<food.length; i++){
        html += `<div class = "food${numberOfFood[i]}" style = "grid-area: ${food[i][1]} / ${food[i][0]}"></div>`;
    }
    for(let i=0; i<snakeBody.length; i++){
        html += `<div class = "snake" style = "grid-area: ${snakeBody[i].y} / ${snakeBody[i].x}"></div>`;
    }
    if(d){
        for(let i=snakeBody.length-2; i>=0; i--){
            snakeBody[i+1] = {...snakeBody[i]};
        }
        snakeBody[0].x += speedX;
        snakeBody[0].y += speedY;
    }
    //updateScore();

    for(let i=0; i<food.length; i++){
        if (snakeBody[0].x == food[i][0] && snakeBody[0].y == food[i][1]){
            if (i != 0){
                
                //score += 1;
                food.splice(i,1);
                numberOfFood.splice(i,1);
                gameOver = true;
                break;
            }
            else{
                score += 1;
                food.splice(i,1);
                numberOfFood.splice(i,1);
                if (food.length == 0){
                    score += 2;
                    timeLeft += 5;
                    generateFood();
                }
                break;
                
            }
        }
        if (score >= highScore){
                highScore = score;
        }
        else{
                highScore = highScore;
        }
        ScoreBoard.textContent = `Score: ${score}`;
        localStorage.setItem("highScore", highScore);
        highScoreBoard.textContent = `High Score: ${highScore}`;
        
    }
    
    if(snakeBody[0].x<=0 || snakeBody[0].x>30 || snakeBody[0].y<=0 || snakeBody[0].y>30 ){
        //console.log(snakeBody[0]);
        gameOver = true;
    }
    let html2 = "";
    leaderList.forEach((element, index) => {
        html2 += `<di class = "leader grid-row-start = ${index + 1} grid-column-start = 1">${element[1]} ${element[0]}</div><br>`;
    });
    
    leaderBox.innerHTML = html2;
    playBoard.innerHTML = html;
}

    
    



moveSnake = (a) => {
    if(timeLeft == 60){
        startTime = new Date();
        timeLeft = 59.99;
        
    }
    let keyData = a.key;
     
   
    if (keyData === "ArrowUp" && speedY != 1){
        d = 1;
        speedX = 0;
        speedY = -1;
    }
    else if (keyData === "ArrowDown" && speedY != -1){
        d = 1;
        speedX = 0;
        speedY = 1;
    }
    else if (keyData === "ArrowRight" && speedX != -1){
        d = 1;
        speedX = 1;
        speedY = 0;
    }
    else if (keyData === "ArrowLeft" && speedX != 1){
        d = 1;
        speedX = -1;
        speedY = 0;

    }
}

controls.forEach(e => {
    e.addEventListener("click", () => moveSnake({key:e.dataset.key}));
});

//let speedSnake = window.prompt("Enter speed of snake:");
//changeFoodPosition();
generateFood();
setIntervalId = setInterval(foodPosition, 100);
document.addEventListener("keydown", moveSnake);

const timer = (e) => {
    
    if(e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowUp"){
        const time = setInterval(()=>{
            timeValue.innerHTML = s;
            s -= 1;
            if(s < 0){
                clearInterval(time);
                displayGameOver();  
            }
        },1000);
    }
}


/*document.addEventListener("keydown", timer ,{once: true} );*/

//arrowClick();
const colors = ["white","green","blue","darkorchid"];
colorSequence(colors);
//generateFoodColors(colors);


