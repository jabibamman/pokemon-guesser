import { createAction, props } from '@ngrx/store';
import { Pokemon } from "@core/models/pokemon.model";

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons'
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemons: Pokemon[] }>()
);

export const deletePokemon = createAction(
  '[Pokemon] Delete Pokemon',
  props<{ id: number }>()
);

export const deletePokemonSuccess = createAction(
  '[Pokemon] Delete Pokemon Success',
  props<{ id: number }>()
);

export const deletePokemonFailed = createAction(
  '[Pokemon] Delete Pokemon Failed',
  props<{ error: any }>()
);