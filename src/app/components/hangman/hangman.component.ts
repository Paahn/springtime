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

  public startNewGame(): void {
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

  public guessLetter(guessedLetter: string): void {
    let letter = guessedLetter.toLowerCase();
    if (this.wordGuessed()) {
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

  public wordGuessed(): boolean {
    return this.lettersRemainingToGuess() === 0;
  }

  private lettersRemainingToGuess(): number {
    return this.word.length - this.hiddenWord.replace(/_/g, '').length;
  }
}
