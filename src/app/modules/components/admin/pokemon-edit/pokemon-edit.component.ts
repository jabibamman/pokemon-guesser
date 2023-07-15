import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from '@core/models/pokemon.model';
import { AppState } from '@core/store/app.state';
import { updatePokemon } from '@core/store/pokemon.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-pokemon-edit',
  templateUrl: './pokemon-edit.component.html',
  styleUrls: ['./pokemon-edit.component.css']
})
export class PokemonEditComponent implements OnChanges {
  @Input() pokemon!: Pokemon;
  @Output() pokemonUpdated: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  form: FormGroup;
  
  constructor(private store: Store<AppState>, private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      malePct: ['', [Validators.min(0), Validators.max(100)]],
      femalePct: ['', [Validators.min(0), Validators.max(100)]],
      types : ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      captRate: ['', Validators.required],
      expPoints: ['', Validators.required],
      expSpeed: ['', Validators.required],
      hp: ['', Validators.required],
      baseTotal: ['', Validators.required],
      attack: ['', Validators.required],
      defense: ['', Validators.required],
      special: ['', Validators.required],
      speed: ['', Validators.required],
      evolutions: ['', Validators.required],
      legendary: ['', Validators.required],
    });
  }

  updatePokemon(updatedPokemon: Pokemon): void {
    console.log('Voici le pokemon mis à jour :', updatedPokemon);

    updatedPokemon.number = this.pokemon.number;
    updatedPokemon.image = this.pokemon.image;
    this.store.dispatch(updatePokemon({ pokemon: updatedPokemon }));
    this.pokemonUpdated.emit(updatedPokemon);

    this.pokemon = updatedPokemon;
  }


  updateFormValues(): void {
    if (this.pokemon) {
      console.log('PokemonEditComponent constructor()', this.pokemon);

      this.form.patchValue({
        name: this.pokemon.name,
        types: this.pokemon.types,
        height: this.pokemon.height,
        weight: this.pokemon.weight,
        malePct: this.pokemon.malePct,
        femalePct: this.pokemon.femalePct,
        captRate: this.pokemon.captRate,
        expPoints: this.pokemon.expPoints,
        expSpeed: this.pokemon.expSpeed,
        hp: this.pokemon.hp,
        baseTotal: this.pokemon.baseTotal,
        attack: this.pokemon.attack,
        defense: this.pokemon.defense,
        special: this.pokemon.special,
        speed: this.pokemon.speed,
        evolutions: this.pokemon.evolutions,
        legendary: this.pokemon.legendary,
      });
    }
  }

  ngOnChanges(): void {
    this.updateFormValues();
  }

}

