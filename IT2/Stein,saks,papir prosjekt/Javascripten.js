let userScore = 0; // setter 0 fordi da blir stillingen 0:0 fra starter av. Samme med computerScore som er under
let computerScore = 0;
var userChoice = 0; // 0 her og fordi brukeren ikke har valgt stein, saks eller papir enda
var userScore_span = document.getElementById("user-score"); // henter ut userScore som ligger inni span-id i indexen.
var computerScore_span = document.getElementById("computer-score"); // henter ut computerScore som ligger inni span-id i indexen.
var scoreboard_div = document.querySelector(".score-board"); // henter ut stillingen som ligger inni div-class i indexen. Bruker queryselector for å spesifikt hente ut stillingen, samme med resultat som er under
var result_p = document.querySelector(".result");
var Rock_div = document.getElementById("r");
var Scissors_div = document.getElementById("s");
var Paper_div = document.getElementById("p");


// denne funksjonen lagde jeg for at PC'en skal generere ulike valg (stein, saks eller papir) for å spille mot en person.
function getComputerChoice() {
    const valgene = ['r','p','s'];
    const randomNummer = Math.floor(Math.random() * 3);
    return valgene [randomNummer];
}


function endreTilOrd(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

function win(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} smashes ${endreTilOrd(computerChoice)}${underOrdComp}. You win!`
}

function lose(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    const userChoice_div = document.getElementById(userChoice);
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} loses to ${endreTilOrd(computerChoice)}${underOrdComp}. Better luck next time!`;
}

function draw(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub();
    const underOrdComp = "comp".fontsize(3).sub();
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} equals to ${endreTilOrd(computerChoice)}${underOrdComp}. Try one more time!`;
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