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
    console.log('+1 point de vie');
  }

  decrementLife() {
    console.log('-1 point de vie');
  }
}
