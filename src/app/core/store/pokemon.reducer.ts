import { loadPokemonsSuccess, loadPokemons } from './pokemon.action';
import { createReducer, on } from '@ngrx/store';
import { Pokemon } from "@core/models/pokemon.model";

export const initialState: Pokemon[] = [];

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, state => [...state]),
  on(loadPokemonsSuccess, (state, { pokemons }) => pokemons)
);
