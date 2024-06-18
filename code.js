 const teams = [
  "barcelona", "realmadrid", "manchesterunited",
  "bayernmunich", "juventus", "liverpool",
  "parissaintgermain", "chelsea", "manchestercity", "arsenal"
];


let selectedTeam = teams[Math.floor(Math.random() * teams.length)];

let displayTeam = "";
for (let i = 0; i < selectedTeam.length; i++) {
displayTeam += "_ ";
}

let attempts = 6;

// Feedback messages based on attempts left
const feedbackMessages = [
  "You lose! Your head just got guillotined. You have 5 guesses left",
  "Your torso just got diced! You have 4 guesses left",
  "Right leg just turned into minced meat... You have 3 guesses left",
  "Your left arm just got SICKED! You have 2 guesses left",
  "Your left leg just got WRECKED xD! You have 1 guess left",
  "Your right arm just got chopped off! GGs"
];

// Get references to the HTML elements
const wordDisplay = document.getElementById('word-display');
const message = document.getElementById('message');
const guessInput = document.getElementById('guess-input');

// Display the initial hidden team name
wordDisplay.textContent = displayTeam;

// Function to handle a guessed letter
function handleGuess(char) {
  // Convert the guessed letter to lowercase
  char = char.toLowerCase();

  // Check if the guessed letter is in the selected team name
  if (selectedTeam.indexOf(char) !== -1) {
      let newDisplay = '';
      for (let i = 0; i < selectedTeam.length; i++) {
          if (selectedTeam[i] === char) {
              newDisplay += char + ' ';
          } else {
              newDisplay += displayTeam[2 * i] + ' ';
          }
      }
      displayTeam = newDisplay;
      wordDisplay.textContent = displayTeam;

      // Check if the player has guessed the entire team name
      if (displayTeam.indexOf('_') === -1) {
          message.textContent = 'Congratulations! You won!';
          document.removeEventListener('keydown', handleKeydown);
      }
  } else {
      // Decrease the number of attempts if the guess was wrong
      attempts--;
      // Update the feedback message
      message.textContent = feedbackMessages[6 - attempts];
      if (attempts === 0) {
          message.textContent += ' The team was ' + selectedTeam + '.';
          document.removeEventListener('keydown', handleKeydown);
      }
  }
}

// Function to handle keydown events
function handleKeydown(event) {
  if (event.key === 'Enter') {
      const char = guessInput.value;
      if (char) {
          handleGuess(char);
          guessInput.value = ''; // Clear the input field
      }
  }
}

// Add event listener for keydown events
document.addEventListener('keydown', handleKeydown);
