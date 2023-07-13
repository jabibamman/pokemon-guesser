import { Pokemon } from "@core/models/pokemon.model";

export interface AppState {
  readonly pokemons: Pokemon[];
}