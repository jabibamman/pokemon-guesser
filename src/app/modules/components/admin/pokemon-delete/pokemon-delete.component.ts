import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppState } from '@core/store/app.state';
import { deletePokemon } from '@core/store/pokemon.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pokemon-delete',
  templateUrl: './pokemon-delete.component.html',
  styleUrls: ['./pokemon-delete.component.css']
})
export class PokemonDeleteComponent {
  @Output() pokemonDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  pokemonId!: number;

  pokemonToDelete: string = '';

  constructor(private store: Store<AppState>) { }


  deletePokemon(): void {
    if (confirm('Are you sure you want to delete this Pokemon?')) {
      this.store.dispatch(deletePokemon({ id: this.pokemonId }));
      this.pokemonDeleted.emit(this.pokemonId);
    }
  }
} 