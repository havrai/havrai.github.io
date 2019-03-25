
const cvs = document.getElementById("slange");
const ctx = cvs.getContext("2d");

// lager rutene/boksen som slangen skal bevege seg innenfor
const box = 32;

// laster bilder
const ground = new Image();
ground.src = "img/bakgrunn.png";

const foodImg = new Image();
foodImg.src = "img/food2.png";

// laster inn lyd-filene
let dod = new Audio();
let spis = new Audio();
let opp = new Audio();
let hoyre = new Audio();
let venstre = new Audio();
let ned = new Audio();

dod.src = "audio/dead.mp3";
spis.src = "audio/beep-07.mp3";
opp.src = "audio/up.mp3";
hoyre.src = "audio/right.mp3";
venstre.src = "audio/left.mp3";
ned.src = "audio/down.mp3";

// lager slangen
let slange = [];

slange[0] = {
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
    if( key == 37 && d != "HOYRE"){
        venstre.play();
        d = "VENSTRE";
    }else if(key == 38 && d != "NED"){
        d = "OPP";
        opp.play();
    }else if(key == 39 && d != "VENSTRE"){
        d = "HOYRE";
        hoyre.play();
    }else if(key == 40 && d != "OPP"){
        d = "NED";
        ned.play();
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

        for (let i = 0; i < slange.length; i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(slange[i].x, slange[i].y, box, box);
            ctx.strokeStyle = "red";
            ctx.strokeRect(slange[i].x, slange[i].y, box, box);
        }

        ctx.drawImage(foodImg, food.x, food.y);


        // gamle posisjonen til slangehodet
        let slangeX = slange[0].x;
        let slangeY = slange[0].y;

        // hvilken retning slangen beveger seg
        if (d == "VENSTRE") slangeX -= box;
        if (d == "OPP") slangeY -= box;
        if (d == "HOYRE") slangeX += box;
        if (d == "NED") slangeY += box;

        // hvis slangen spiser mat så spiller lyden, hvis ikke så skjer ingenting, spillet fortsetter bare
        if (slangeX == food.x && slangeY == food.y) {
            score++;
            spis.play();
            food = {
                x: Math.floor(Math.random() * 17 + 1) * box,
                y: Math.floor(Math.random() * 15 + 3) * box
            }
        } else {
            slange.pop();
        }

        // legger til nytt hode
        let newHead = {
            x: slangeX,
            y: slangeY
        }

        // game over, lyd spiller og spillet stopper
        if (slangeX < box || slangeX > 17 * box || slangeY < 3 * box || slangeY > 17 * box || collision(newHead, slange)) {
            clearInterval(game);
            dod.play();
        }

        slange.unshift(newHead);

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