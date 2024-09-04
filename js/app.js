/*-------------------------------- Constants --------------------------------*/

//const words = require('./data.js');
const win = "you win!";
const maxAttempts = 5;
const hiddenWord = "value";

/*---------------------------- Variables (state) ----------------------------*/

let winner;
let wordleBoard;
let userWord;
let attemptCounter = 0;
let squareIndex = 0;


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

const handleClick = (event) => {
    const keyValue = event.target.value;

    if (squareIndex < squareEls.length) {
        const square = squareEls[squareIndex];
        square.textContent = keyValue;
        squareIndex++;
    }
}


/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {
    key.addEventListener('click', handleClick)
});

resetButtonEl.addEventListener('click', function(event) {
    init();
});


document.addEventListener('DOMContentLoaded', init);

// refer to textContent 





