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


export const updatePokemon = createAction(
  '[Pokemon] Update Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const updatePokemonSuccess = createAction(
  '[Pokemon] Update Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const updatePokemonFailed = createAction(
  '[Pokemon] Create Pokemon Failed',
  props<{ error: any }>()
);

export const createPokemon = createAction(
  '[Pokemon] Create Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const createPokemonSuccess = createAction(
  '[Pokemon] Create Pokemon Success',
  props<{ pokemon: Pokemon }>()
);

export const createPokemonFailed = createAction(
  '[Pokemon] Create Pokemon Failed',
  props<{ error: any }>()
);

export const clonePokemon = createAction(
  '[Pokemon] Clone Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const clonePokemonSuccess = createAction(
  '[Pokemon] Clone Pokemon Success',
  props<{ pokemon: Pokemon }>()
);
