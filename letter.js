class Letter {
    constructor(letter) {
        this.letter = letter;
        this.isGuessed = false;
    }

    setGuessed() {
        this.isGuessed = true;
    }
    display() {
        if (this.isGuessed) {
            return this.letter;
        } else {
            return '-';
        }
    }

}

module.exports = Letter;