import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent, title: 'Pokédex' },
  {
    path: 'pokemons/edit/:id',
    component: PokemonEditComponent,
    title: 'Pokémon',
  },
  {
    path: 'pokemons/:id',
    component: PokemonProfileComponent,
    title: 'Pokémon',
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, title: 'Page introuvable' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
