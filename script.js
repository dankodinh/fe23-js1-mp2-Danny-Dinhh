let userScore = 0; // Användarens poäng
let computerScore = 0; // Datorns poäng
let gameEnded = false; // Flagga för att indikera om spelet är slut

// Funktion för att få datorns val. Slumpar mellan Rock, Paper och Scissors.
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber].toLowerCase(); // Returnerar datorns val i små bokstäver
}

// Funktion för att uppdatera textinnehållet i ett HTML-element
function updateDisplay(elementId, text) {
    const element = document.getElementById(elementId); // Hämtar elementet med angivet ID
    element.textContent = text; // Uppdaterar textinnehållet i elementet
}

// Funktion för att hantera en runda av spelet
function playRound(playerSelection) {
    if (gameEnded) { // Kontrollerar om spelet är slut
        updateDisplay('round-result', 'Game has ended. Please reset to play again.');
        return; // Avbryter funktionen om spelet är slut
    }

    const computerSelection = getComputerChoice(); // Hämtar datorns val
    playerSelection = playerSelection.toLowerCase(); // Omvandlar spelarens val till små bokstäver

    // Visar spelarens och datorns val
    updateDisplay('player-choice', `Your choice: ${playerSelection}`);
    updateDisplay('computer-choice', `Computer's choice: ${computerSelection}`);

    let roundResult; // Variabel för att lagra resultatet av rundan
    if (playerSelection === computerSelection) { // Kontrollerar om det är oavgjort
        roundResult = "It's a draw!";
    } else {
        // Kontrollerar om spelaren vinner
        const jagSpelare = (playerSelection === 'rock' && computerSelection === 'scissors') ||
                          (playerSelection === 'scissors' && computerSelection === 'paper') ||
                          (playerSelection === 'paper' && computerSelection === 'rock');

        if (jagSpelare) { // Om spelaren vinner
            userScore++; // Ökar spelarens poäng
            roundResult = `You win this round! ${playerSelection} beats ${computerSelection}`;
        } else { // Om datorn vinner
            computerScore++; // Ökar datorns poäng
            roundResult = `You lose this round! ${computerSelection} beats ${playerSelection}`;
        }

        // Uppdaterar poängen
        updateDisplay('user-score', userScore);
        updateDisplay('computer-score', computerScore);

        // Kontrollerar om någon har vunnit spelet
        if (userScore === 3 || computerScore === 3) {
            const winnerMessage = userScore === 3 ? 'You win the game!' : 'Computer wins the game!';
            updateDisplay('game-winner', winnerMessage); // Visar vinnarmeddelandet
            gameEnded = true; // Markerar att spelet är slut
        }
    }
    updateDisplay('round-result', roundResult); // Visar resultatet av rundan
}

// Funktion för att återställa spelet. Återställer resultat av spelet till 0.
function resetGame() {
    userScore = 0; // Nollställer användarens poäng
    computerScore = 0; // Nollställer datorns poäng
    gameEnded = false; // Återställer flaggan för spelstatus
    // Rensar visad information på skärmen
    updateDisplay('user-score', userScore);
    updateDisplay('computer-score', computerScore);
    updateDisplay('game-winner', '');
    updateDisplay('player-choice', '');
    updateDisplay('computer-choice', '');
    updateDisplay('round-result', '');
}

// Lägger till event-lyssnare på varje valknapp
const choiceButtons = document.querySelectorAll('.choice');
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        playRound(this.id); // Startar en runda när knappen klickas
    });
});

// Lägger till event-lyssnare på återställningsknappen
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame); // Återställer spelet när knappen klickas
