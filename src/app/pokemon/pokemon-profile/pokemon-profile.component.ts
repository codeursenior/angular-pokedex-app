import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
})
export class PokemonProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);
  private readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId)
  ).asReadonly();
}
