import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemons/:id', component: PokemonProfileComponent },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
