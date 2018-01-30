const inquirer = require('inquirer');

const Word = require('./word.js');
const Letter = require('./letter.js');

const aWords = ['javascript', 'css', 'jquery', 'bootstrap', 'html', 'node'];
const endGuesses = 10;
let oWord;
let letters = '';


const generateWord = () => {
    oWord = new Word(aWords[Math.floor(Math.random() * aWords.length)]);
}

generateWord();

const playAgainPrompt = (string) => {
    inquirer.prompt([{
        type: 'list',
        name: 'playAgain',
        message: `${string}
        Do you want to play Again?`,
        choices: ['Yes', 'No']
    }]).then((data) => {
        if (data.playAgain === 'Yes') {
            generateWord();
            letters = '';
            takeInGuessPrompt(0);
        } else {
            console.log('Thanks for playing!');
        }
    }).catch((error) => {
        console.log(error);
    });
}

const takeInGuessPrompt = (currentIndex, string) => {
    string = string || 'Take a Guess';
    inquirer.prompt([{
        type: 'input',
        name: 'userGuess',
        message: `${string}
                ${oWord.display()}
                Guess a letter!`
    }]).then((data) => {
        if (letters.indexOf(data.userGuess.toLowerCase()) < 0) {
            letters += data.userGuess.toLowerCase();
            let isCorrect = oWord.checkGuess(data.userGuess);
            if (oWord.checkWordGuessed()) {
                return playAgainPrompt("Congratulations, The Word is " + oWord.display() + ".");
            }
            if (currentIndex < endGuesses) {
                takeInGuessPrompt(++currentIndex, isCorrect);
            } else {
                return playAgainPrompt("You're out of Guesses.");
            }
        } else {
            takeInGuessPrompt(currentIndex, data.userGuess + " already guessed");
        }

    }).catch((error) => {
        console.log(error);
    });
}

takeInGuessPrompt(0);