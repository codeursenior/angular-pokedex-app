import { Component, inject, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, Pokemon, POKEMON_RULES } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-add',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './pokemon-add.component.html',
  styles: ``
})
export class PokemonAddComponent {
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly POKEMON_RULES = signal(POKEMON_RULES).asReadonly();
  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    picture: new FormControl('', [Validators.required]),
    life: new FormControl(10),
    damage: new FormControl(1),
    types: new FormArray([new FormControl('Normal')], [Validators.required, Validators.maxLength(3)]),
  });


  onSubmit() {
    Object.values(this.form.controls).forEach(control => control.markAsDirty());

    if(this.form.invalid) {
      return;
    }

    const pokemon: Omit<Pokemon, 'id'> = {
      name: this.pokemonName.value,
      picture: this.pokemonPicture.value,
      life: this.pokemonLife.value,
      damage: this.pokemonDamage.value,
      types: this.pokemonTypeList.controls.map(control => control.value) as [string, string?, string?],
      created: new Date()
    };

    this.pokemonService.addPokemon(pokemon).subscribe((pokemonAdded) => {
      this.router.navigate(['/pokemons', pokemonAdded.id]);
    });
  }

  get pokemonPicture() {
    return this.form.get('picture') as FormControl;
  }

  get pokemonName() {
    return this.form.get('name') as FormControl;
  }

  get pokemonLife() {
    return this.form.get('life') as FormControl;
  }

  get pokemonDamage() {
    return this.form.get('damage') as FormControl;
  }

  get pokemonTypeList() {
    return this.form.get('types') as FormArray;
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }

  incrementLife() {
    const newValue = this.pokemonLife.value + 1;
    this.pokemonLife.setValue(newValue);
  }

  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }

  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }

  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
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
