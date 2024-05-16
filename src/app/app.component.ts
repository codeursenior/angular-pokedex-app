import { Component, computed, signal } from '@angular/core';
import { POKEMON_LIST } from './pokemon-list.fake';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  pokemonList = signal(POKEMON_LIST);
}
