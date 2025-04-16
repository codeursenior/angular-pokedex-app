import { DatePipe } from '@angular/common';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { PokemonService } from '../../pokemon.service';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-pokemon-list',
    imports: [DatePipe, RouterLink, PokemonBorderDirective],
    templateUrl: './pokemon-list.component.html',
    styles: [
        `
      .pokemon-card {
        cursor: pointer;
      }
    `,
    ]
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);

  constructor() {
    this.pokemonService.getPokemonList().subscribe((pokemonList) => {
      this.pokemonList.set(pokemonList);
    });
  }

  readonly pokemonList = signal<PokemonList>([]);
  readonly loading = computed(() => !this.pokemonList());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList()?.filter((pokemon) =>
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
}
