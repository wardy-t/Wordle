/*-------------------------------- Constants --------------------------------*/

//const words = require('./data.js');

const maxAttempts = 5;
const wordLength = 5;

/*---------------------------- Variables (state) ----------------------------*/

let winner;
let wordleBoard;
let userWord = [];
let attemptCounter = 0;
let squareIndex = 0;
let usedWords = [];


/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('#reset');
const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr')
const keyEls = document.querySelectorAll('.key')


/*-------------------------------- Functions --------------------------------*/
const init = () => {
    attemptCounter = 0;
    userWord = "";
    //hiddenWord = "";
}


const fetchHiddenWord = async () => {
    try {
        const response = await fetch('https://api.datamuse.com/words?sp=?????&max=1000'); // Fetch words with 5 letters
        const data = await response.json();

        if (data.length > 0) {
            let randomWord;

            do {
                const randomIndex = Math.floor(Math.random() * data.length);
                randomWord = data[randomIndex]?.word?.toUpperCase() || null;
            } while (randomWord && usedWords.includes(randomWord));

            if (randomWord) {
                usedWords.push(randomWord);
                return randomWord;
            }
        }

    } catch (error) {
        console.error('Error fetching word:', error);
        return null;
    }
};

//const submit = ()

const checkWord = (userWord, hiddenWord) => {
    attemptCounter++;

    if (userWord === hiddenWord) {
            messageEl.textContent = "You win!";
    }   else if (attemptCounter >= maxAttempts) {
            messageEl.textContent = `You lose! The word was ${hiddenWord}`;
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

document.addEventListener('DOMContentLoaded', async () => {
    let hiddenWord = await fetchHiddenWord();
    console.log('Hidden Word:', hiddenWord);
})

console.log("used words", usedWords)
// refer to textContent 






/*const fetchHiddenWord = async () => {
    try {
        const response = await fetch('https://api.datamuse.com/words?sp=?????&max=1000'); // Fetch words with 5 letters
        const data = await response.json();

        if (data.length > 0) {
            let randomWord
            do {
                const randomIndex = Math.floor(Math.random() * data.length);
                const randomWord = data[randomIndex]?.word;
                return randomWord ? randomWord.toUpperCase() : null;
            } while (usedWords.includes(randomWord));
            usedWords.push(randomWord);
            return randomWord;

        }
    } catch (error) {
        console.error('Error fetching word:', error);
        return null;
    }
};
*/