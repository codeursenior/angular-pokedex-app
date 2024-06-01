import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId())
  ).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, { nonNullable: true }),
    life: new FormControl(this.pokemon().life, { nonNullable: true }),
    damage: new FormControl(this.pokemon().damage, { nonNullable: true }),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });

  get pokemonTypeList() {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string) {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    );
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if (isChecked) {
      // Add control
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      // Remove control
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }
}
