import { Pokemon } from "@core/models/pokemon.model";
import { GameState } from "../store/game.state";

export interface AppState {
  game: GameState;
  pokemons: Pokemon[];}