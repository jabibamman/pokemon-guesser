import { createAction, props } from '@ngrx/store';
import { Pokemon } from "@core/models/pokemon.model";

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);
