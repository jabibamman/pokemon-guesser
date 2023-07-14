import {Pokemon} from "@core/models/pokemon.model";

export class SearchService {
  allPokemons: Pokemon[] = []; // Variable pour stocker tous les pokémons
  filteredPokemons: Pokemon[];

  constructor() {
    this.filteredPokemons = [];
  }

  search(term: string) {
    this.filteredPokemons = this.allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }
}
