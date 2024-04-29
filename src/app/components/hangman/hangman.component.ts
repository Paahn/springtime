import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent {
  private words = ['cherry blossoms', 'spring', 'favorite', 'season'];
  private word = '';
  public hiddenWord = '';
  private guessedLetters = '';
  public incorrectGuesses = 0;

  public constructor() {
    this.startNewGame();
  }

  public startNewGame() {
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    this.hiddenWord = '_'.repeat(this.word.length);
    this.guessedLetters = '';
    this.incorrectGuesses = 0;
  }

  public guessLetter(letter: string) {
    if (this.wordGuessed()) {
      console.log('You already guessed the word!');
      return;
    }
    if (this.word.includes(letter)) {
      let newHiddenWord = '';
      for (let i = 0; i < this.word.length; i++) {
        if (this.word[i] === letter) {
          newHiddenWord += letter;
        } else {
          newHiddenWord += this.hiddenWord[i];
        }
      }
      this.hiddenWord = newHiddenWord;
    } else {
      this.incorrectGuesses++;
    }
    this.guessedLetters += letter;
  }

  public wordGuessed() {
    console.log("remaining to guess: ", this.lettersRemainingToGuess());
    return this.lettersRemainingToGuess() === 0;
  }

  private lettersRemainingToGuess() {
    console.log(this.hiddenWord.replace(/_/g, '').length);
    return this.word.length - this.hiddenWord.replace(/_/g, '').length;
  }
}
