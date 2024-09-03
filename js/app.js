/*-------------------------------- Constants --------------------------------*/

//const words = require('./data.js');
const win = "you win!";
const maxAttempts = 5;

/*---------------------------- Variables (state) ----------------------------*/

let winner;
let wordleBoard;
let userWord;
let attemptCounter = 0;


/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('#reset');
const messageEl = document.querySelector('#message');

/*-------------------------------- Functions --------------------------------*/
const hiddenWord = "value";

const checkWord = (userWord, hiddenWord) => {
    attemptCounter++;

    if (userWord === hiddenWord) {
            messageEl.textContent = "You win!";
    }   else if (attemptCounter >= maxAttempts) {
            messageEl.textContent = "you lose!";
    }   else {
            messageEl.textContent = "try again!"
    }
};

const resetGame = () => {
    attemptCounter = 0;
}
/*----------------------------- Event Listeners -----------------------------*/

//resetButtonEl.addEventListener('click', function(Event){
   // Init();
//});

//document.addEventListener('DOMContentLoaded', init);

// refer to textContent 


console.log(checkWord("valve", hiddenWord));
console.log(checkWord("viola", hiddenWord));
console.log(checkWord("verve", hiddenWord));


