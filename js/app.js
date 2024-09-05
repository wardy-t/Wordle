
//BUGS: Backspace does not work

/*-------------------------------- Constants --------------------------------*/

//const words = require('./data.js')

const maxAttempts = 5;
const wordLength = 5;



/*---------------------------- Variables (state) ----------------------------*/

let winner;
let wordleBoard;
let userWord;
let userWordArray = []
let attemptCounter = 0;
let squareIndex = 0;
let usedWords = [];
let row;


/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('#reset');
const messageEl = document.querySelector('#message');
const squareEls = document.querySelectorAll('.sqr')
const keyEls = document.querySelectorAll('.key')


/*-------------------------------- Functions --------------------------------*/

const render = () => {
    userWordArray.forEach((letter, index) => {
        const square = squareEls[row * wordLength + index];
        square.textContent = letter;
    });
    
    for (let i = userWordArray.length; i < wordLength; i++) {
        const square = squareEls[row * wordLength + i];
        square.textContent = '';
    }

};

const init = () => {
    attemptCounter = 0;
    userWordArray = [];
    squareIndex = 0;
    hiddenWord = fetchHiddenWord();
    console.log('Hidden Word:', hiddenWord);
    row = 0;
    //messageEl.textContent = "Welcome to Wordle!"
    
    squareEls.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = '';
    });
    
    render();
};


const fetchHiddenWord = () => {
    let randomWord;
        do {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomWord = words[randomIndex].toUpperCase();
        } while (usedWords.includes(randomWord));
            usedWords.push(randomWord);
            return randomWord;
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
    const keyValue = event.target.value;

    if (keyValue === 'Backspace') {
        if (userWordArray.length > 0) {
            userWordArray.pop();
            squareIndex--;
            const square = squareEls[squareIndex];
            square.textContent = '';
            render();
        }
    }
    
    if (userWordArray.length < wordLength) {
        if (squareIndex < squareEls.length) {
            const square = squareEls[squareIndex];
            square.textContent = keyValue;
            userWordArray.push(keyValue);
            squareIndex++;
            render();
        }
    }

    else if (userWordArray.length === wordLength) {
        const userWord = userWordArray.join('');
        checkWord(userWord, hiddenWord);
        colorAssist(userWord, hiddenWord);
        userWordArray = [];
        row++
        squareIndex = row * wordLength;
        render();
    }
};

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {
    key.addEventListener('click', handleClick)
});

resetButtonEl.addEventListener('click', function(event) {
    init();
});


document.addEventListener('DOMContentLoaded', init);


console.log("user word", userWord)
console.log("used words", usedWords)
console.log("render", render)






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