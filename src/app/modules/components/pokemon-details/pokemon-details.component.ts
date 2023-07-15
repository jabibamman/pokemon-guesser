import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { AppState } from '@core/store/app.state';
import { deletePokemon } from '@core/store/pokemon.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html'
})
export class PokemonDetailsComponent {
  @Input() pokemon?: Pokemon;
  @Input() deletedPokemonId?: number;
  @Output() pokemonDeleted: EventEmitter<number> = new EventEmitter<number>();


  constructor(private store: Store<AppState>) {}

  handlePokemonDeleted(id: number): void {
    this.store.dispatch(deletePokemon({ id }));
    if (this.pokemon && this.pokemon.number === id) {
      localStorage.removeItem('selectedPokemon');
      this.pokemonDeleted.emit(id); 
    }  
  }
}
