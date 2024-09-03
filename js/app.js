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


/*-------------------------------- Functions --------------------------------*/
const hiddenWord = "value";

const checkWord = (userWord, hiddenWord) => {
    attemptCounter++;

    if (userWord === hiddenWord) {
            return "You win!";
    }   else if (attemptCounter >= maxAttempts) {
            return "you lose!";
    }   else {
            return "try again!"
    }
};

const resetGame = () => {
    attemptCounter = 0;
}
/*----------------------------- Event Listeners -----------------------------*/

//document.addEventListener('DOMContentLoaded', init);

// refer to textContent 


console.log(checkWord("value", hiddenWord));
console.log(checkWord("vines", hiddenWord));
console.log(checkWord("veers", hiddenWord));
console.log(checkWord("verts", hiddenWord));
console.log(checkWord("vests", hiddenWord));
