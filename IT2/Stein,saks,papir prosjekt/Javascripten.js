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

// denne funksjonen gjør at div elementene p, r og s bytter fra id-navn til hele navn.
// Altså p blir til paper osv, så istedet for at det sto "p wins over r" så står det "paper wins over rock" i selveste spillet.
function endreTilOrd(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors";
}

//funksjon for hva som skjer hvis man vinner over pc-en.
function win(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub(); // viser til hvem som har valgt hva. Så blir enten user eller comp som liten tekst ved siden av valget.
    const underOrdComp = "comp".fontsize(3).sub(); // samme som over.
    const userChoice_div = document.getElementById(userChoice);
    userScore++; // hvis brukeren vinner, øker stillingen i scoreboardet.
    userScore_span.innerHTML = userScore; // viser til total score utifra hva maskinen eller brukeren har valgt i scoreboardet.
    computerScore_span.innerHTML = computerScore; // viser til total score utifra hva maskinen eller brukeren har valgt i scoreboardet.
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} smashes ${endreTilOrd(computerChoice)}${underOrdComp}. You win!`
    // result delen => Bytter først ut brukerens valg fra p,r eller s til hele ordet. Så legger den til hvem som har valgt hva ved siden av (comp eller user)
    // så kommer det tekst for om man har vunnet eller tapt, og hva man har vunnet/tapt til.
}

function lose(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub(); // viser til hvem som har valgt hva. Så blir enten user eller comp som liten tekst ved siden av valget.
    const underOrdComp = "comp".fontsize(3).sub(); // samme som over.
    const userChoice_div = document.getElementById(userChoice);
    computerScore++; // hvis pc-en vinner, øker stillingen i scoreboardet.
    userScore_span.innerHTML = userScore; // viser til total score utifra hva maskinen eller brukeren har valgt i scoreboardet.
    computerScore_span.innerHTML = computerScore; // viser til total score utifra hva maskinen eller brukeren har valgt i scoreboardet.
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} loses to ${endreTilOrd(computerChoice)}${underOrdComp}. Better luck next time!`;
    // result delen => Bytter først ut brukerens valg fra p,r eller s til hele ordet. Så legger den til hvem som har valgt hva ved siden av (comp eller user)
    // så kommer det tekst for om man har vunnet eller tapt, og hva man har vunnet/tapt til.
}

function draw(userChoice, computerChoice) {
    const underOrdBruker = "user".fontsize(3).sub(); // viser til hvem som har valgt hva. Så blir enten user eller comp som liten tekst ved siden av valget.
    const underOrdComp = "comp".fontsize(3).sub(); // samme som over.
    result_p.innerHTML = `${endreTilOrd(userChoice)}${underOrdBruker} equals to ${endreTilOrd(computerChoice)}${underOrdComp}. Try one more time!`;
    // result delen => Bytter først ut brukerens valg fra p,r eller s til hele ordet. Så legger den til hvem som har valgt hva ved siden av (comp eller user)
    // så kommer det tekst for at det er uavgjort og at man skal prøve igjen.
}

// denne funksjonen viser til hvordan man vinner, taper eller det blir uavgjort.
// Hvis kombinasjonene over win blir brukt - så vinner useren.
// Hvis kombinasjonene over lose blir brukt - så taper useren.
// Hvis kombinasjonene over draw blir brukt - så er det uavgjort.
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

// Dette er det som får spillet til å funke. Man spiller ved å trykke på en av bildene som er på nettsiden.
// Angir funksjoner som skal kjøres når eventen oppstår. SÅ hvis man klikker på r, p eller s så kjører funksjonen.
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

// For at funksjonen faktisk skal kjøre er det viktig å skrive funksjonsnavnet main(); for at det skal vises på nettsiden.
main();

// la til en knapp for å resete spillet hvis man vil begynne på nyy. Så hvis man klikker på knappen i nettsiden så kjører funksjonen.
// Spillet blir oppdatert til 0:0 fordi at jeg ikke har lagt inn noe destinasjon i document.href("").
document.getElementById("reset-game").onclick = function() {
    document.location.href = "";
}