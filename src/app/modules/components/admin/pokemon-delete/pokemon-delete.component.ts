import { Component, EventEmitter, Output } from '@angular/core';
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
  
  pokemonToDelete: string = '';

  constructor(private store: Store<AppState>) { }


  deletePokemon(id: number): void {
    if (confirm('Are you sure you want to delete this Pokemon?')) {
      console.log('Deleting Pokemon with id: ' + id);
      this.store.dispatch(deletePokemon({ id }));
      this.pokemonToDelete = ''; // Réinitialise la valeur de pokemonToDelete
      this.pokemonDeleted.emit(id);
    }
  }
}