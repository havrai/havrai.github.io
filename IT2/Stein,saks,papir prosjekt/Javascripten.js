var brukerScore = 0;
var computerScore = 0;
var brukerScore_span = document.getElementById("user-score");
var computerScore_span = document.getElementById("computer-score");
var stillingen_div = document.querySelector(".stillingen");
var result_p = document.querySelector(".resultat");
var Rock_div = document.getElementById("r");
var Scissors_div = document.getElementById("s");
var Paper_div = document.getElementById("p");


function getcomputerChoice() {
    const valgene = ['stein','saks','papir'];
    const randomNummer = Math.floor(Math.random() * 3);
    return valgene [randomNummer];
}

function endreOrd(letter) {
    if (letter === "r")return "Rock";
    if (letter === "p")return "Paper";
    return "Scissors";

}

function win(brukerChoice, computerChoice) {
    brukerScore++;
    brukerScore_span.innerHTML = brukerScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreOrd(brukerChoice)} smashes ${endreOrd(computerChoice)}. You win!`;
}

function lose() {
    computerScore++;
    brukerScore_span.innerHTML = brukerScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${endreOrd(brukerChoice)} loses to ${endreOrd(computerChoice)}. Better luck next time!`;
}

function draw() {
    result_p.innerHTML = `${endreOrd(brukerChoice)} equals to ${endreOrd(computerChoice)}. Both of you lose!`;
}

function spill(brukerChoice) {
    var computerChoice = getcomputerChoice();
    //console.log("bruker valg =>" + brukerChoice); // tester i konsollen
    //console.log("pc valg =>" + computerChoice); // tester i konsollen

    switch (brukerChoice + computerChoice) {
        case "r s":
        case "p r":
        case "s p":
            win();
            break;
        case "r p":
        case "p s":
        case "s r":
            lose();
            break;
        case "r r":
        case "s s":
        case "p p":
            draw();
            break;
    }
}


function main() {
    Rock_div.addEventListener('click', function () {
        spill("r");
    })
    Scissors_div.addEventListener('click', function () {
        spill("s");
    })
    Paper_div.addEventListener('click', function () {
        spill("p");
    })
}

main();
