import { Pokemon } from '@core/models/pokemon.model';
import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction('[Game] Start New Game');

export const makeGuess = createAction('[Game] Make Guess', props<{ guess: string }>());

export const gameOver = createAction('[Game] Game Over');

export const decrementRemainingGuesses = createAction('[Game] Decrement Remaining Guesses');

export const addHintMessage = createAction(
    '[Game] Add Hint Message',
    props<{ message: string }>()
);

export const addGuessedPokemon = createAction(
    '[Game] Add Guessed Pokemon',
    props<{ pokemon: Pokemon }>()
  );

