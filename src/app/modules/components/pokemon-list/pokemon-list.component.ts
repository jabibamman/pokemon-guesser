import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  @Input() pokemons: Pokemon[] = [];
  @Output() select = new EventEmitter<Pokemon>();
}
