import { Component, EventEmitter, Output } from '@angular/core';
import { AlphabetComponent } from '../alphabet/alphabet.component';

@Component({
  selector: 'app-hangman',
  standalone: true,
  imports: [AlphabetComponent],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss'
})
export class HangmanComponent {
  @Output() public setWinningBackground = new EventEmitter<boolean>();
  private words = ['spring is just around the corner'];
  private word = '';
  public hiddenWord = '';
  public guessedLetters = '';
  private incorrectGuessedLetters = '';
  public incorrectGuesses = 0;

  public constructor() {
    this.startNewGame();
  }

  public startNewGame() {
    this.hiddenWord = '';
    this.word = this.words[Math.floor(Math.random() * this.words.length)];
    for (let i = 0; i < this.word.length; i++) {
      this.hiddenWord += this.word[i] === ' '
      ? ' '
      : '_'
    }
    this.guessedLetters = '';
    this.incorrectGuesses = 0;
    this.incorrectGuessedLetters = ''
    this.setWinningBackground.emit(false);
  }

  public guessLetter(guessedLetter: string) {
    let letter = guessedLetter.toLowerCase();
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
      if (this.wordGuessed()) {
        this.setWinningBackground.emit(true);
      }
    } else {
      if (!this.incorrectGuessedLetters.includes(letter)) {
        this.incorrectGuessedLetters += letter;
      }
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
