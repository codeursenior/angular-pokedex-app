import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Pokédex';
  name = 'Pikachu';
  life = 21;

  incrementLife() {
    this.life = this.life + 1;
  }

  decrementLife() {
    this.life = this.life - 1;
  }
}
