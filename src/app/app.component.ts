import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = signal('Pikachu');
  life = signal(21);
  imageSrc = signal(
    'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png'
  );
  size = computed(() => {
    if (this.life() <= 15) {
      return 'Petit';
    }

    if (this.life() >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  });

  incrementLife() {
    this.life.update((n) => n + 1);
  }

  decrementLife() {
    this.life.update((n) => n - 1);
  }
}
