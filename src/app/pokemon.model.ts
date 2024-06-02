export function getPokemonColor(type: string) {
  switch (type) {
    case 'Feu':
      return '#EF5350';
    case 'Eau':
      return '#42A5F5';
    case 'Plante':
      return '#66BB6A';
    case 'Insecte':
      return '#8d6e63';
    case 'Vol':
      return '#90CAF9';
    case 'Poison':
      return '#b388ff';
    case 'Fée':
      return '#f8bbd0';
    case 'Electrik':
      return '#f4ff81';
    default:
      return '#303030';
  }
}

export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè]+$/,
  MAX_NAME: 20,
  MIN_NAME: 3,
  MAX_LIFE: 30,
  HIGH_LIFE: 25,
  LOW_LIFE: 15,
  MIN_LIFE: 10,
  MAX_DAMAGE: 10,
  MIN_DAMAGE: 1,
  MIN_TYPES: 1,
  MAX_TYPES: 3,
};

export interface Pokemon {
  id: number;
  name: string;
  picture: string;
  life: number;
  damage: number;
  types: [string, string?, string?];
  created: Date;
}

export type PokemonList = Pokemon[];
