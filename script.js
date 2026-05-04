console.log("Script started");

// Array of nature sentences for typing practice
let natureSentences = [
    "The morning dew sparkled on the green grass like tiny diamonds.",
    "Tall pine trees swayed gently in the cool mountain breeze.",
    "A colorful butterfly landed softly on the bright yellow sunflower.",
    "The crystal clear stream bubbled peacefully through the forest.",
    "Golden autumn leaves danced slowly to the forest floor.",
    "A family of deer grazed quietly in the sunny meadow.",
    "The ocean waves crashed rhythmically against the rocky shore.",
    "Fluffy white clouds drifted lazily across the bright blue sky."
];

let currentSentence = "";

// Function to pick a random nature sentence
function getRandomSentence() {
    let randomIndex = Math.floor(Math.random() * natureSentences.length);
    return natureSentences[randomIndex];
}

// Function to display the sentence with faded styling
function displaySentence() {
    currentSentence = getRandomSentence();
    let textDisplay = document.getElementById("textDisplay");
    textDisplay.innerText = currentSentence;
    textDisplay.style.color = "#888"; // Reset to faded color
}

// Call this function when the page loads to show a sentence
displaySentence();

// Get the start button and user input elements
let startBtn = document.getElementById("startBtn");
let userInput = document.getElementById("userInput");
let timerDisplay = document.getElementById("timer");

let gameActive = false;
let timeLeft = 60;

// Function to start the game
function startGame() {
    gameActive = true;
    timeLeft = 60;
    
    // Enable the typing area
    userInput.disabled = false;
    userInput.focus();
    
    // Disable the start button during game
    startBtn.disabled = true;
    startBtn.innerText = "Game Running...";
    
    // Clear any previous text in input
    userInput.value = "";
    
    // Display a new random sentence
    displaySentence();
    
    // Start the countdown timer
    startTimer();
}

// Function to handle the countdown timer
function startTimer() {
    let timer = setInterval(function() {
        timeLeft = timeLeft - 1;
        timerDisplay.innerText = timeLeft;
        
        // When time runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

// Function to end the game
function endGame() {
    gameActive = false;
    userInput.disabled = true;
    
    // Calculate final results
    let userText = userInput.value;
    let correctChars = 0;
    
    for (let i = 0; i < Math.min(userText.length, currentSentence.length); i++) {
        if (userText[i] === currentSentence[i]) {
            correctChars++;
        }
    }
    
    let accuracy = Math.round((correctChars / currentSentence.length) * 100);
    let wordsTyped = Math.floor(correctChars / 5); // 5 characters = 1 word
    let wpm = Math.round(wordsTyped / ((60 - timeLeft) / 60));
    
    alert("Game finished! WPM: " + wpm + ", Accuracy: " + accuracy + "%");
    
    // Automatically reset for a new game
    resetGame();
}

// Add click event to start button
startBtn.addEventListener("click", startGame);

// Function to check user progress and highlight mistakes
function checkUserInput() {
    if (!gameActive) return;
    
    let userText = userInput.value;
    let textDisplay = document.getElementById("textDisplay");
    let highlightedText = "";
    
    // Go through each character and compare
    for (let i = 0; i < currentSentence.length; i++) {
        if (i < userText.length) {
            // User has typed this character
            if (userText[i] === currentSentence[i]) {
                // Correct character - show in green
                highlightedText += '<span style="color: green; background-color: #e8f5e8;">' + currentSentence[i] + '</span>';
            } else {
                // Wrong character - show in red
                highlightedText += '<span style="color: red; background-color: #ffe6e6;">' + currentSentence[i] + '</span>';
            }
        } else {
            // User hasn't typed this character yet - keep it faded
            highlightedText += '<span style="color: #888;">' + currentSentence[i] + '</span>';
        }
    }
    
    // Update the display with highlighted text
    textDisplay.innerHTML = highlightedText;
    
    // Check if user finished typing the sentence
    if (userText.length >= currentSentence.length) {
        endGame();
    }
}

// Add event listener to track typing
userInput.addEventListener("input", checkUserInput);
// Function to reset the game
function resetGame() {
    gameActive = false;
    timeLeft = 60;
    
    // Reset display elements
    timerDisplay.innerText = "60";
    document.getElementById("wpm").innerText = "0";
    document.getElementById("accuracy").innerText = "100%";
    
    // Reset buttons and input
    startBtn.disabled = false;
    startBtn.innerText = "Start Game";
    userInput.disabled = true;
    userInput.value = "";
    
    // Display a new random sentence
    displaySentence();
}
