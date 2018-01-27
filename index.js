const inquirer = require('inquirer');

const Word = require('./word.js');
const Letter = require('./letter.js');

const aWords = ['javascript', 'css', 'jquery', 'bootstrap', 'html', 'node'];
const endGuesses = 10;
let oWord = '';


const generateWord = () => {
    oWord = new Word(aWords[Math.floor(Math.random() * aWords.length)]);
}

generateWord();

const playAgainPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'playAgain',
        message: `Do you want to play Again?`,
        choices: ['Yes', 'No']
    }]).then((data) => {
        if (data.playAgain === 'Yes') {
            generateWord();
            takeInGuessPrompt(0);
        } else {
            console.log('Thanks for playing!');
        }
    }).catch((error) => {
        console.log(error);
    });
}

const takeInGuessPrompt = (currentIndex) => {
    inquirer.prompt([{
        type: 'input',
        name: 'userGuess',
        message: `${oWord.display()}
                Guess a letter!`
    }]).then((data) => {
        oWord.checkGuess(data.userGuess);
        if (oWord.checkWordGuessed()) {
            return playAgainPrompt();
        }
        if (currentIndex < endGuesses) {
            takeInGuessPrompt(++currentIndex);
        } else {
            console.log('No more Guesses');
        }
    }).catch((error) => {
        console.log(error);
    });
}

takeInGuessPrompt(0);