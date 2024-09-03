/*-------------------------------- Constants --------------------------------*/

//const words = require('./data.js');
const win = "you win!";
const maxAttempts = 5;
const letter = document.createElement

/*---------------------------- Variables (state) ----------------------------*/

let winner;
let wordleBoard;
let userWord;
let attemptCounter = 0;


/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('#reset');
const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr')
const keyEls = document.querySelectorAll('.key')


/*-------------------------------- Functions --------------------------------*/
const init = () => {
    attemptCounter = 0;
    userWord = "";
}

const hiddenWord = "value";

const checkWord = (userWord, hiddenWord) => {
    attemptCounter++;

    if (userWord === hiddenWord) {
            messageEl.textContent = "You win!";
    }   else if (attemptCounter >= maxAttempts) {
            messageEl.textContent = "You lose!";
    }   else {
            messageEl.textContent = "Try again!"
    }
};


/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {
    key.addEventListener('click', (event) => {
        const keyValue = event.target.innerText;

        console.log('key value:', keyValue);
    });
});

resetButtonEl.addEventListener('click', function(event) {
    init();
});


document.addEventListener('DOMContentLoaded', init);

// refer to textContent 


console.log(checkWord("valve", hiddenWord));
console.log(checkWord("viola", hiddenWord));
console.log(checkWord("verve", hiddenWord));
console.log(checkWord("valet", hiddenWord));


