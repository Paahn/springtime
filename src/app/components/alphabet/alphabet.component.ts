import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-alphabet',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss'
})
export class AlphabetComponent {
  @Input() public guessedLetters: string | '' = '';
  @Output() letterClicked = new EventEmitter<string>();
  public alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  public onLetterClick(letter: string) {
    this.letterClicked.emit(letter);
  }
}
