document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Default
    const playerName = document.getElementById('playerNameInput').value;
    if (playerName) {
        isNameSubmitted = true;
        document.getElementById('nameForm').style.display = 'none'; // Gömmer sig från spelet
        document.getElementById('gameSection').style.display = 'block'; // Visar spel sektionen
        document.getElementById('playerNameDisplay').innerText = playerName;
    } else {
        alert("Please enter your name to start the game.");
    }
});

let isNameSubmitted = false;
let userScore = 0; // Användarens poäng
let computerScore = 0; // Datorns poäng
let gameEnded = false; // Flagga för att indikera om spelet är slut

// Funktion för att få datorns val. Slumpar mellan Rock, Paper och Scissors.
function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber].toLowerCase(); // Returnerar datorns val i små bokstäver
}

// Function to update the text content of an HTML element
function updateDisplay(elementId, text) {
    const element = document.getElementById(elementId); // Get the element with the specified ID
    element.textContent = text; // Update the text content of the element
}

// Funktion för att uppdatera textinnehållet i ett HTML-element
function playRound(playerSelection) {
    if (!isNameSubmitted) {
        alert("Please submit your name before playing.");
        return;
    }

    if (gameEnded) { 
        updateDisplay('round-result', 'Game has ended. Please reset to play again.');
        return; 
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
        // Check if the player wins
        const playerWins = (playerSelection === 'rock' && computerSelection === 'scissors') ||
                          (playerSelection === 'scissors' && computerSelection === 'paper') ||
                          (playerSelection === 'paper' && computerSelection === 'rock');

        if (playerWins) { 
            userScore++; // Ökar spelarens poäng
            roundResult = `You win this round! ${playerSelection} beats ${computerSelection}`;
        } else { // Om datorn vinner
            computerScore++; // Ökar datorns poäng
            roundResult = `You lose this round! ${computerSelection} beats ${playerSelection}`;
        }

        // Uppdaterar poängen
        updateDisplay('user-score', `User score: ${userScore}`);
        updateDisplay('computer-score', `Computer score: ${computerScore}`);

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
    updateDisplay('user-score', `User score: ${userScore}`);
    updateDisplay('computer-score', `Computer score: ${computerScore}`);
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
