import { Component, Input } from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-alphabet',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alphabet.component.html',
  styleUrl: './alphabet.component.scss'
})
export class AlphabetComponent {
  @Input() public incorrectGuessedLetters: string | '' = '';
  public alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
}
