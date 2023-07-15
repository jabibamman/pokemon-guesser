import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store/app.state';
import { clonePokemon } from '@core/store/pokemon.action';

@Component({
  selector: 'app-pokemon-clone',
  template: `<button (click)="clonePokemon()">Clone</button>`
})
export class PokemonCloneComponent {
  @Input() pokemon!: Pokemon;
  @Output() pokemonCloned: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private store: Store<AppState>) {}

  clonePokemon() {
    let clonedPokemon = { ...this.pokemon, number: this.generateRandomNumber() };
    this.pokemonCloned.emit(clonedPokemon);
  }

  generateRandomNumber(): number {
    return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
  }
}