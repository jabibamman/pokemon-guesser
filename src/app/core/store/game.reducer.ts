import { createReducer, on } from '@ngrx/store';
import { startNewGame, makeGuess, gameOver, decrementRemainingGuesses } from './game.action';
import { GameState, setGameStarted, setTargetPokemon } from './game.state';

export const initialState: GameState = {
    gameStarted: false,
    userGuess: "",
    remainingGuesses: 5,
    hintMessage: [],
    guessedPokemon: null,
    targetPokemon: null,
};

export const gameReducer = createReducer(
    initialState,
    on(setTargetPokemon, (state, { pokemon }) => ({ ...state, targetPokemon: pokemon })),
    on(setGameStarted, (state, { gameStarted }) => ({ ...state, gameStarted })),
    on(startNewGame, state => ({ ...state, gameStarted: true, remainingGuesses: 5, userGuess: '', hintMessage: [], guessedPokemon: null })),
    on(makeGuess, (state, { guess }) => ({ ...state, userGuess: guess })),
    on(decrementRemainingGuesses, state => ({ ...state, remainingGuesses: state.remainingGuesses - 1 })),
    on(gameOver, state => ({ ...state, gameStarted: false }))
  );