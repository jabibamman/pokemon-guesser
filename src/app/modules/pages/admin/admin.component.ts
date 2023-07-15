import {Component, OnDestroy} from '@angular/core';
import {Pokemon} from "@core/models/pokemon.model";
import {createPokemon} from "@core/store/pokemon.action";
import {Store} from "@ngrx/store";
import {AppState} from "@core/store/app.state";
import {getPokemonList} from "@core/store/pokemon.selector";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  allPokemons$: Observable<Pokemon[]>;

  constructor(private store: Store<AppState>) {
    this.allPokemons$ = this.store.select(getPokemonList);
  }

  onCreatedPokemon(createdPokemon: Pokemon): void {
    this.store.dispatch(createPokemon({ pokemon: createdPokemon }));
    this.subscription.add(
      this.allPokemons$.subscribe(pokemons => {
        const index = pokemons.findIndex((p: Pokemon) => p.number === createdPokemon.number);
        if (index !== -1) {
          const allPokemonsCopy = pokemons.slice();
          allPokemonsCopy[index] = createdPokemon;
          pokemons = allPokemonsCopy;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
