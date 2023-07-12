import { Component, Input } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html'
})
export class PokemonDetailsComponent {
  @Input() pokemon?: Pokemon;
}
