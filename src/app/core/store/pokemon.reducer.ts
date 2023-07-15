import { loadPokemonsSuccess, loadPokemons, deletePokemon, deletePokemonSuccess, deletePokemonFailed, updatePokemonSuccess, updatePokemonFailed } from './pokemon.action';
import { createReducer, on } from '@ngrx/store';
import { Pokemon } from "@core/models/pokemon.model";

export const initialState: Pokemon[] = [];



export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, state => [...state]),
  on(loadPokemonsSuccess, (state, { pokemons }) => pokemons),
  on(deletePokemonSuccess, onDeletePokemon),
  on(deletePokemonFailed, (state, { error }) => {
    console.error('Error deleting Pokemon:', error);
    return state;
  }),
  on(updatePokemonSuccess, onUpdatePokemon),
  on(updatePokemonFailed, (state, { error }) => {
    console.error('Error updating Pokemon:', error);
    return state;
  })

);



function onDeletePokemon(state: Pokemon[], action: { id: number }) {
    const updatedPokemons = state.filter(pokemon => pokemon.number !== action.id);
    return updatedPokemons;
}

function onUpdatePokemon(state: Pokemon[], action: { pokemon: Pokemon }) {
  const updatedPokemons = state.map(pokemon => 
    pokemon.number === action.pokemon.number ? action.pokemon : pokemon
  );
  return updatedPokemons;
}