import { createAction, props } from '@ngrx/store';

export const startNewGame = createAction('[Game] Start New Game');

export const makeGuess = createAction('[Game] Make Guess', props<{ guess: string }>());

export const gameOver = createAction('[Game] Game Over');

export const decrementRemainingGuesses = createAction('[Game] Decrement Remaining Guesses');

