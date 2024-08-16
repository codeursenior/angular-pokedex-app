import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [DatePipe, RouterLink, PokemonBorderDirective],
  templateUrl: './pokemon-list.component.html',
  styles: ``,
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);
  readonly pokemonList = toSignal(this.pokemonService.getPokemonList(), {
    initialValue: [],
  });
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    );
  });

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }

  incrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life + 1;
  }

  decrementLife(pokemon: Pokemon) {
    pokemon.life = pokemon.life - 1;
  }
}
