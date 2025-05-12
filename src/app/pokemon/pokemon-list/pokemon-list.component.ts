import { DatePipe } from '@angular/common';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { PokemonService } from '../../pokemon.service';
import { Pokemon, PokemonList } from '../../pokemon.model';
import { RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';

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
  readonly pokemonListResource = this.pokemonService.getPokemonList();
  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => {
    return this.pokemonListResource.value().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    )
    .filter((pokemon) => {
      const typeSelected = this.typeSelected();
      if (!typeSelected) {
        return true;
      }
      return pokemon.types.includes(typeSelected);
    })
  });

  readonly typeList = computed(() => {
    const allTypes = this.pokemonListResource.value().flatMap((pokemon) => pokemon.types);
    return [...new Set(allTypes)];
  });

  readonly typeSelected = linkedSignal<string[], string|null>({
    source: this.typeList,
    computation: (newTypeList, previous) => {
      const isTypeListEmpty = newTypeList.length === 0;
      if (isTypeListEmpty) {
        return null;
      }

      if(!previous?.value) {
        return null;
      }

      const isPreviousTypeSelectedValid = !!newTypeList.find(type => type === previous.value);

      if(isPreviousTypeSelectedValid) {
        return previous.value;
      }

      return newTypeList[0];
    }
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


  filterByType(type: string): void {
    const newType = this.typeSelected() === type ? null : type;
    this.typeSelected.set(newType);
  }

  removePokemon(pokemon: Pokemon): void {
    this.pokemonListResource.update((pokemonList) => {
      return pokemonList.filter(({id}) => id !== pokemon.id);
    });
  }
}
