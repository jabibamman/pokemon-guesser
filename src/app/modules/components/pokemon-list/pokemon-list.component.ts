import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { AppState } from '@core/store/app.state';
import { loadPokemons } from '@core/store/pokemon.action';
import { getPokemonList } from '@core/store/pokemon.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent {
  @Output() select = new EventEmitter<Pokemon>();
  @Input() filteredPokemons!: Pokemon[] | null;

  pokemons$: Observable<Pokemon[]>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadPokemons());
    this.pokemons$ = this.store.select(getPokemonList);
    this.pokemons$.subscribe(pokemons => {
      this.filteredPokemons = pokemons;
    });
  }

  trackById(index: number, pokemon: Pokemon): number {
    return pokemon.number;
  }
}
