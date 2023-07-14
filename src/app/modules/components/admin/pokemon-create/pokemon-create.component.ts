import {Component} from "@angular/core";
import {Pokemon} from "@core/models/pokemon.model";
import {ExpSpeedTypes} from "@shared/enums/expspeed-types.enum";
import {EntitiesTypes} from "@shared/enums/entities-types.enum";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html'
})
export class PokemonCreateComponent {
  pokemon: Pokemon;
  expSpeedOptions = Object.values(ExpSpeedTypes);
  typesOptions = Object.values(EntitiesTypes);

  constructor() {
    this.pokemon = new Pokemon();
    this.pokemon.malePct = 50;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }

  updateFemalePercentage() {
    this.pokemon.femalePct = 100 - this.pokemon.malePct;
  }
}
