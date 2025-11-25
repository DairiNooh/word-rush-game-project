console.log('Hello World!!');

//
// Array of sentences
const sentences = [
    "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "All work and no play makes Jack a dull boy.",
    "Practice makes perfect. Keep trying and never give up.",
    "Learning JavaScript is fun and powerful!"
];

// --- Sentence Setup ---
let currentIndex = 0;
//let currentSentence = getRandomSentence();
let unusedSentences = [...sentences];
let sentencesCompleted = 0;




const statsSentenceElement = document.getElementById('stats-sentence');
console.log(statsSentenceElement);

statsSentenceElement.textContent = 'Sentences Completed: ' + sentencesCompleted + '/' + sentences.length;

const statsAccuracyElement = document.getElementById('stats-accuracy');
statsAccuracyElement.textContent = 'Accuracy: 0.0%';

let currentSentence = getNextSentence();
let displayChars = currentSentence.split(""); // NEW: store the actual displayed characters


// Accuracy
let totalInputtedChars = 0;
let totalCorrectCharsInputted = 0;

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



// Getting and referencing the p tag that has the id sentence
const pElement = document.getElementById('sentence');

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


renderSentence(); // first time render



// --- Move underline on key press ---
// document.addEventListener("keydown", (e) => {
//     // Move to next character
//     currentIndex++;

//     // Stop if reached end
//     if (currentIndex >= currentSentence.length) {
//         currentIndex = currentSentence.length - 1;
//         return;
//     }

//     renderSentence();
// });

// 
document.addEventListener("keydown", handleKeyPressed)


function getAccuracy() {
    if (totalInputtedChars === 0) return ; // before typing
    return ((totalCorrectCharsInputted / totalInputtedChars) * 100).toFixed(1);
}



function handleKeyPressed(e) {

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

     // Move forward
    currentIndex++;

    // Prevent typing past end
    if (currentIndex >= plainChars.length)
    {

        sentencesCompleted++;

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

// function handleKeyPressed(e)
// {

//   const chars = currentSentence.split("");

//     // check if pressed key matches current char
//     if (e.key === chars[currentIndex]) {
//         chars[currentIndex] = `<span class="correct">${chars[currentIndex]}</span>`;
//     } else {
//         chars[currentIndex] = `<span class="wrong">${chars[currentIndex]}</span>`;
//     }
//   currentIndex++;

//   if(currentIndex >= currentSentence.length)
//   {
//     currentIndex = currentSentence.length - 1;
//     return;
//   }

//   renderSentence();
// }







// function getPressedKey(e)
// {
//   console.log("You pressed:", e.key);
// }



















// --- Timer (00.0 format) ---
let timeLeft = 60.0; 
const timerEl = document.getElementById("timer");

const countdown = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft < 0) timeLeft = 0;

    const displayTime = timeLeft.toFixed(1).padStart(4, "0");
    timerEl.textContent = `Time: ${displayTime}`;

    if (timeLeft <= 0) {
        clearInterval(countdown);
    }
}, 100);



const resetButtonElement = document.querySelector('#reset-btn');
console.log(resetButtonElement);

resetButtonElement.addEventListener('click', resetGame);

function resetGame()
{
    console.log('the game has been resetted');
}




const difficultyButtonElement = document.querySelector('#difficulty-btn');
console.log(difficultyButtonElement);

difficultyButtonElement.addEventListener('click', changeGameDifficulty);

function changeGameDifficulty()
{
    //difficultyButtonElement.textContent = 'changed';
    //console.log('the current value is: ' + difficultyButtonElement.textContent);
    let currentDifficulty = difficultyButtonElement.textContent;
    if(currentDifficulty == 'Easy')
    {
      difficultyButtonElement.textContent = 'Normal';
    }
    else if(currentDifficulty == 'Normal')
    {
      difficultyButtonElement.textContent = 'Hard';
    }
    else if(difficultyButtonElement.textContent == 'Hard')
    {
      difficultyButtonElement.textContent = 'Easy';
    }

    resetGame();
}








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


/*-------------------------------- Constants --------------------------------*/
/*-------------------------------- Variables --------------------------------*/
/*------------------------ Cached Element References ------------------------*/
/*----------------------------- Event Listeners -----------------------------*/
/*-------------------------------- Functions --------------------------------*/