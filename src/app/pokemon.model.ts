export interface Pokemon {
  id: number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types: [string, string?, string?];
  created: Date;
}

export const POKEMON_RULES = {
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
};

export type PokemonList = Pokemon[];
