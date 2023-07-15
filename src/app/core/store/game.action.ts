import { Pokemon } from '@core/models/pokemon.model';
import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction(
  '[Game] Start New Game',
  props<{ remainingGuesses: number }>()
);
export const makeGuess = createAction('[Game] Make Guess', props<{ guess: string }>());

export const gameOver = createAction('[Game] Game Over');

export const decrementRemainingGuesses = createAction('[Game] Decrement Remaining Guesses');

export const addHint = createAction(
    '[Game] Add Hint',
    props<{ hint: string }>()
  );
export const resetHints = createAction('[Game] Reset Hints');

export const resetGuessedPokemons = createAction('[Game] Reset Guessed Pokemons');

export const setRemainingGuesses = createAction('[Game] Set Remaining Guesses', props<{ remainingGuesses: number }>());

export const addGuessedPokemon = createAction(
    '[Game] Add Guessed Pokemon',
    props<{ pokemon: Pokemon; hint: string }>()
  );
  
