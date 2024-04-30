import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HangmanComponent } from './components/hangman/hangman.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HangmanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'time for hangman';

  public setBackgroundImage(winning: boolean) {
    if (winning) {
      document.body.className = 'winning-background';
    } else {
      document.body.className = 'app';
    }
  }
}
