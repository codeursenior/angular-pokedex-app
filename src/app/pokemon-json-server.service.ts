import { inject, Signal } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { PokemonService } from './pokemon.service';

export class PokemonJSONServerService implements PokemonService {
  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  // Retourne la liste de tous les Pokémons.
  getPokemonList(): HttpResourceRef<PokemonList> {
    return httpResource<PokemonList>(() => this.POKEMON_API_URL, { defaultValue: [] });
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.
  getPokemonById(id: Signal<number>): HttpResourceRef<Pokemon|undefined> {
    return httpResource<Pokemon>(() => {
      if(!id()) {
        return undefined;
      }
      
      return `${this.POKEMON_API_URL}/${id()}`
    });
  }

  // Met à jour un pokémon existant.
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put<Pokemon>(
      `${this.POKEMON_API_URL}/${pokemon.id}`,
      pokemon
    );
  }

  // Supprime un pokémon.
  deletePokemon(pokemonId: number): Observable<void> {
    return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`);
  }

  // Ajoute un pokémon.
  addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
    return this.http.post<Pokemon>(this.POKEMON_API_URL, pokemon);
  }

  // Retourne la liste des types valides pour un pokémon.
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
