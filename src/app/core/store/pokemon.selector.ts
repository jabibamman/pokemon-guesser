import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { Pokemon } from '@core/models/pokemon.model';

export const selectPokemonList = (state: AppState) => state.pokemons;

export const getPokemonList = createSelector(
  selectPokemonList,
  (state: Pokemon[]) => state
);
