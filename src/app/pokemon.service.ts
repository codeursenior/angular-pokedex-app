import { inject, Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  // Retourne la liste de tous les Pokémons.
  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.
  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${id}`);
  }

  // Met à jour un pokémon existant.
  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const url = `${this.POKEMON_API_URL}/${pokemon.id}`;
    return this.http.put<Pokemon>(url, pokemon);
  }

  // Supprime un pokémon.
  deletePokemon(pokemonId: number): Observable<void> {
    const url = `${this.POKEMON_API_URL}/${pokemonId}`;
    return this.http.delete<void>(url);
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
