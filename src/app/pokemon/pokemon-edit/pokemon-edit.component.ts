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
import { POKEMON_RULES, getPokemonColor } from '../../pokemon.model';

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
  readonly POKEMON_RULES = signal(POKEMON_RULES).asReadonly();

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    types: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

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

  onSubmit() {
    console.log(this.form);
  }

  get pokemonLife() {
    return this.form.get('life') as FormControl;
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  get pokemonDamage() {
    return this.form.get('damage') as FormControl;
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }
}
