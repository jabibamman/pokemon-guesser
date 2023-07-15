import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GameState } from "./game.state";

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectGuessedPokemonsHints = createSelector(
    selectGameState,
    (state: GameState) => state.hintMessage
);

export const selectRemainingGuesses = createSelector(
    selectGameState,
    (state: GameState) => state.remainingGuesses
);
