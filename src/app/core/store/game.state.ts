import { createAction, props } from "@ngrx/store";
import { Pokemon } from "../models/pokemon.model";

export interface GameState {
  gameStarted: boolean;
  remainingGuesses: number;
  userGuess: string;
  hintMessage: string[];
  guessedPokemon: Pokemon | null;
  targetPokemon: Pokemon | null;
  guessedPokemons: Pokemon[];
  guessedPokemonsHints: string[];

}
  
export const setTargetPokemon = createAction(
  '[Game] Set Target Pokemon',
  props<{ pokemon: Pokemon }>()
);

export const setGameStarted = createAction(
  '[Game] Set Game Started',
  props<{ gameStarted: boolean }>()
)