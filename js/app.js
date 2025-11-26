

/*------------------------ Cached Element References ------------------------*/
const timerEl = document.getElementById("timer");
const resetButtonElement = document.querySelector('#reset-btn');
const difficultyButtonElement = document.querySelector('#difficulty-btn');
const pElement = document.getElementById('sentence');
const statsSentenceElement = document.getElementById('stats-sentence');
const statsAccuracyElement = document.getElementById('stats-accuracy');
const statsWPMElement = document.getElementById('stats-wpm');
const footerPElement = document.getElementById('footer-p');

/*-------------------------------- Constants --------------------------------*/
// Array of sentences
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "All work and no play makes Jack a dull boy.",
    "Practice makes perfect. Keep trying and never give up.",
    "Learning JavaScript is fun and powerful!"
];

/*-------------------------------- Variables --------------------------------*/
// --- Sentence Setup ---
let currentIndex = 0;
//let currentSentence = getRandomSentence();
let unusedSentences = [...sentences];
let sentencesCompleted = 0;
let timeIsUp = false;
let currentSentence = getNextSentence();
let displayChars = currentSentence.split(""); // NEW: store the actual displayed characters
// Accuracy
let totalInputtedChars = 0;
let totalCorrectCharsInputted = 0;

let difficulty = 'Easy'; // i do not think we need this
let requiredAccuracy = 60; // change it to target accuracy
let totalTime = 60.0; // this is needed for wpm 
let timeLeft = totalTime; 
let startTimerBool = false;

/*----------------------------- Event Listeners -----------------------------*/
resetButtonElement.addEventListener('click', resetGame);
difficultyButtonElement.addEventListener('click', changeGameDifficulty);

/*-------------------------------- Functions --------------------------------*/
function getNextSentence()
{

    
    statsSentenceElement.textContent = 'Sentences Completed: ' + sentencesCompleted + '/' + sentences.length;

    if(unusedSentences.length == 0)
    {
        console.log('all sentences used');
        return;
    }

    // getting random index
    const randomIndex = Math.floor(Math.random() * unusedSentences.length);

    // getting the sentence
    const chosenSentence = unusedSentences[randomIndex];

    // removing the chosenSentence from unusedsentences
    unusedSentences.splice(randomIndex, 1);

    return chosenSentence;

}

function endGame()
{
    clearInterval(countdown); // stops time
    

    const finalAccuracy = getAccuracy() || 0;

    if(finalAccuracy >= requiredAccuracy && sentencesCompleted == sentences.length)
    {
        pElement.textContent = 'YOU WIN!!';
    }
    else
    {
        pElement.textContent = 'YOU LOSE!!';
    }

}

function changeGameDifficulty()
{

    difficultyButtonElement.blur();

    //difficultyButtonElement.textContent = 'changed';
    //console.log('the current value is: ' + difficultyButtonElement.textContent);
    let currentDifficulty = difficultyButtonElement.textContent;
    if(currentDifficulty == 'Easy')
    {
      difficultyButtonElement.textContent = 'Normal';
      totalTime = 50;
      requiredAccuracy = 75;
      

    }
    else if(currentDifficulty == 'Normal')
    {
      difficultyButtonElement.textContent = 'Hard';
      totalTime = 45;
      requiredAccuracy = 90;
    }
    else if(difficultyButtonElement.textContent == 'Hard')
    {
      difficultyButtonElement.textContent = 'Easy';
      totalTime = 60;
      requiredAccuracy = 90;
    }

    footerPElement.textContent = 'Complete all the sentences before the time runs out and achieve a accuracy of ' + requiredAccuracy + '% in order to win.';
    //
    resetGame();
}

function startTimer() {
    countdown = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft < 0) timeLeft = 0;

        const displayTime = timeLeft.toFixed(1).padStart(4, "0");
        timerEl.textContent = `Time: ${displayTime}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            timeIsUp = true;
            endGame();
        }
    }, 100);
}

function resetGame() {

    resetButtonElement.blur();

    // Reset all counters
    currentIndex = 0;
    sentencesCompleted = 0;
    totalInputtedChars = 0;
    totalCorrectCharsInputted = 0;

    timeIsUp = false;

    // Reset stats display
    statsSentenceElement.textContent = 'Sentences Completed: ' + sentencesCompleted + '/' + sentences.length;
    statsAccuracyElement.textContent = 'Accuracy: 0.0%';
    statsWPMElement.textContent = 'WPM: 0';

    // Reset sentences
    unusedSentences = [...sentences];
    currentSentence = getNextSentence();
    displayChars = currentSentence.split("");
    displayChars[0] = `<span class="underline">${displayChars[0]}</span>`;
    pElement.innerHTML = displayChars.join("");

    // Reset timer
    timeLeft = totalTime;
    timerEl.textContent = `Time: ${timeLeft.toFixed(1).padStart(4, "0")}`;

    // Clear previous interval and start a new one
    startTimerBool = false;
    clearInterval(countdown);
    
}

function calculateWPM()
{
    const elapsedTime = (totalTime - timeLeft) / 60; // minutes
    if (elapsedTime === 0) return 0; // prevent division by 0
    return Math.round(totalCorrectCharsInputted / 5 / elapsedTime);
}

function handleKeyPressed(e) 
{
    
    if(!startTimerBool)
    {
        startTimerBool = true;
        startTimer();
    }

    // Checks weather the key inputted is not a single characater
    // characters liek alt ctrl shift and caps lock and multi char so it will return
    if (e.key.length !== 1) return; 

    totalInputtedChars++;
    // Don't create new chars — use displayChars
    let plainChars = currentSentence.split("");

     // Mark correct / wrong
    if (e.key === plainChars[currentIndex]) {
        totalCorrectCharsInputted++;

        displayChars[currentIndex] =
            `<span class="correct">${plainChars[currentIndex]}</span>`;
    } else {
        displayChars[currentIndex] =
            `<span class="wrong">${plainChars[currentIndex]}</span>`;
    }

    statsAccuracyElement.textContent = 'Accuracy: ' + getAccuracy() + '%';
    statsWPMElement.textContent = 'CPM: ' + calculateWPM();

     // Move forward
    currentIndex++;

    // Prevent typing past end
    if (currentIndex >= plainChars.length)
    {
        sentencesCompleted++;

        if (unusedSentences.length === 0) {
        endGame();
        return;
    }

        currentSentence = getNextSentence();
        currentIndex = 0;

        displayChars = currentSentence.split("");
        displayChars[0] = `<span class="underline">${displayChars[0]}</span>`;
        pElement.innerHTML = displayChars.join("");

        return;
    }
    
    // Add underline to next char
    if (currentIndex < plainChars.length) {
        displayChars[currentIndex] =
            `<span class="underline">${plainChars[currentIndex]}</span>`;
    }

    // Re-render the updated display
    pElement.innerHTML = displayChars.join("");
}

// Render the sentence with underline on the current index
function renderSentence()
 {
    // turns the entire sentence into a array f chars letter
    displayChars  = currentSentence.split("");// i do not think we nede this

    // Getting the current letter the user is on and wraping it in span tag that has
    // a class underline and displaying the letter 
    displayChars[currentIndex] = `<span class="underline">${displayChars[currentIndex]}</span>`;

    // combines all the char back to sentence and displays it in the p tag
    // i used innerHTML because using textcontent will not interpret the span tag
    // it would jsut show the actual span tag sytax
    pElement.innerHTML = displayChars.join("");
}

// This function returns a random sentence from the sentences arrays
function getRandomSentence()
{
    // Sets the current index to 0 since a new sentence will be retrived
    currentIndex = 0;

    // Math.random() generates a random number between 0 and 1 (can be float)
    // Multiplying the random floar number with the length of the array
    // we use Math.Floor() to make the final number a whole number
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function getAccuracy() {
    if (totalInputtedChars === 0) return ; // before typing
    return ((totalCorrectCharsInputted / totalInputtedChars) * 100).toFixed(1);
}


/*-------------------------------- Main --------------------------------*/
statsSentenceElement.textContent = 'Sentences Completed: ' + sentencesCompleted + '/' + sentences.length;
statsAccuracyElement.textContent = 'Accuracy: 0.0%';
footerPElement.textContent = 'Complete all the sentences before the time runs out and achieve a accuracy of ' + requiredAccuracy + '% in order to win.';
timerEl.textContent = `Time: ${timeLeft.toFixed(1).padStart(4, "0")}`;

renderSentence(); // first time render

// 
document.addEventListener("keydown", handleKeyPressed);