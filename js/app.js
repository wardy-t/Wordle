/*-------------------------------- Constants --------------------------------*/

const maxAttempts = 5;
const wordLength = 5;

/*---------------------------- Variables (state) ----------------------------*/

let userWord;
let userWordArray = []
let attemptCounter = 0;
let squareIndex = 0;
let row;
let gameOver = false;

/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('#reset');
const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr')
const keyEls = document.querySelectorAll('.key')
const deleteEl = document.querySelector('.delete')
const enterEl = document.querySelector('.enter')

/*-------------------------------- Functions --------------------------------*/

const render = () => {
    userWordArray.forEach((letter, index) => {
        const square = squareEls[row * wordLength + index];
        square.textContent = letter;
    });
    
    for (let i = userWordArray.length; i < wordLength; i++) {
        const square = squareEls[row * wordLength + i];
    }
};

const init = () => {
    attemptCounter = 0;
    userWordArray = [];
    squareIndex = 0;
    hiddenWord = fetchHiddenWord();
    row = 0;
    gameOver = false;
    
    squareEls.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = '';
    });

    render();
};

const fetchHiddenWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].toUpperCase();
};

const checkWord = (userWord, hiddenWord) => {
    attemptCounter++;

    if (userWord === hiddenWord) {
        messageEl.textContent = "You win!";
        gameOver = true;
}   else if (attemptCounter >= maxAttempts) {
        messageEl.textContent = `You lose! The word was ${hiddenWord}`;
        gameOver = true;
}   else {
        messageEl.textContent = "Try again!"
}
    render();
};

const colorAssist = (userWord, hiddenWord) => {
    const hiddenWordArray = hiddenWord.split('');
    
    userWord.split('').forEach((letter, index) => {
        const squareIndex = row * wordLength + index;
        const square = squareEls[squareIndex];

        if (letter === hiddenWordArray[index]) {
            square.style.backgroundColor = 'lime';
        } else if (hiddenWordArray.includes(letter)) {
            square.style.backgroundColor = 'orange';
        } else {
            square.style.backgroundColor = 'gray';
        }
    }
)};

const handleClick = (event) => {
    if (gameOver) return;

    const keyValue = event.target.value;
    
    if (userWordArray.length < wordLength) {
        if (squareIndex < squareEls.length) {
            const square = squareEls[squareIndex];
            square.textContent = keyValue;
            userWordArray.push(keyValue);
            squareIndex++;
            render();
        }
    }
};

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {
    key.addEventListener('click', handleClick)
});

resetButtonEl.addEventListener('click', function(event) {
    init();
    render();
    messageEl.textContent = 'Welcome back!';

});

document.addEventListener('DOMContentLoaded', init);

deleteEl.addEventListener('click', () => {
    if (userWordArray.length > 0) {
        userWordArray.pop();
        squareIndex--;
        const square = squareEls[squareIndex];
        square.textContent = '';
        render();
    }
});

enterEl.addEventListener('click', () => {
    if (userWordArray.length !== wordLength) {
        return; 
    }

    const userWord = userWordArray.join('');
    checkWord(userWord, hiddenWord);
    colorAssist(userWord, hiddenWord);
    userWordArray = [];
    row++;
    squareIndex = row * wordLength;
    render();
});

