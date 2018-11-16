let userScore = 0;
let computerScore = 0;
var userScore_span = document.getElementById("user-score");
var computerScore_span = document.getElementById("computer-score");
var scoreboard_div = document.querySelector(".score-board");
var result_p = document.querySelector(".result");
var Rock_div = document.getElementById("r");
var Scissors_div = document.getElementById("s");
var Paper_div = document.getElementById("p");
var wrong = document.getElementById("wrong");
var correct = document.getElementById("right");


function riktigLyd(){
    correct.play();
}

function feilLyd(){
    wrong.play();
}




function getComputerChoice() {
    const valgene = ['r','p','s'];
    const randomNummer = Math.floor(Math.random() * 3);
    return valgene [randomNummer];
}

function endreTilOrd(letter) {
    if (letter === "r")return "Rock";
    if (letter === "p")return "Paper";
    return "Scissors";
}

function win(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} smashes ${endreTilOrd(computerChoice)}${underOrdComp}. You win!`;
    riktigLyd();
}

function lose(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} loses to ${endreTilOrd(computerChoice)}${underOrdComp}. Better luck next time!`;
    feilLyd();
}

function draw() {
    const userChoice_div = document.getElementById(userChoice);
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} equals to ${endreTilOrd(computerChoice)}${underOrdComp}. It's a draw!`;
}

function spill(userChoice) {
    const computerChoice = getComputerChoice();
    switch (computerChoice + userChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "ss":
        case "pp":
            draw(userChoice, computerChoice);
            break;
        //console.log("bruker valg =>" + userChoice); // tester i konsollen
        //console.log("pc valg =>" + computerChoice); // tester i konsollen
    }
}

function main() {
    Rock_div.addEventListener('click', () => spill("r"));
    Scissors_div.addEventListener('click', () => spill("s"));
    Paper_div.addEventListener('click', () => spill("p"));
}

main();

document.getElementById("reset-game").onclick = function() {
    document.location.href = "";
}