
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// lager rutene/boksen som slangen skal bevege seg innenfor
const box = 32;

// laster bilder
const ground = new Image();
ground.src = "img/bakgrunn.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

// laster inn lyd-filene
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/beep-07.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// lager slangen
let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// plasserer musen på forskjellige steder i spillet
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// setter scoren
let score = 0;

//Kontroller for å bevege på slangen
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// kollisjon funksjon, hvis slangen treffer veggen eller seg selv starter spillet på nytt

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// tegner alt, gameloopen setter i gang alle funksjoner og får spillet til å gå
    function gameLoop() {
        ctx.drawImage(ground, 0, 0);

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = "red";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        ctx.drawImage(foodImg, food.x, food.y);


        // gamle posisjonen til slangehodet
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // hvilken retning slangen beveger seg
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        // hvis slangen spiser mat så spiller lyden, hvis ikke så skjer ingenting, spillet fortsetter bare
        if (snakeX == food.x && snakeY == food.y) {
            score++;
            eat.play();
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
        } else {
            snake.pop();
        }

        // legger til nytt hode
        let newHead = {
            x: snakeX,
            y: snakeY
        }

        // game over, lyd spiller og spillet stopper
        if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
            clearInterval(game);
            dead.play();
        }

        snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score, 2 * box, 1.6 * box);
    }

// gjentar utførelsen av funksjonen kontinuerlig
let game = setInterval(gameLoop,100);

// reset knapp funksjon for å starte spillet på nytt
document.getElementById("reset").onclick = function() {
    document.location.href = "";
}