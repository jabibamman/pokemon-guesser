import {Component, ElementRef, Renderer2} from "@angular/core";
import {Pokemon} from "@core/models/pokemon.model";
import {ExpSpeedTypes} from "@shared/enums/expspeed-types.enum";
import {EntitiesTypes} from "@shared/enums/entities-types.enum";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent {
  pokemon: Pokemon;
  expSpeedOptions = Object.values(ExpSpeedTypes);
  typesOptions = Object.values(EntitiesTypes);
  sliderColor: string;


  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.pokemon = new Pokemon();
    this.pokemon.malePct = 50;
    this.sliderColor = 'primary';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }

  updateFemalePercentage() {
    this.pokemon.femalePct = 100 - this.pokemon.malePct;
  }

  updateSliderColor(event: Event) {
    const rangeInput = event.target as HTMLInputElement;
    const percentage = this.pokemon.malePct / 100;
    const blueValue = Math.round(255 * percentage);
    const pinkValue = Math.round(255 * (1 - percentage));
  
    if (percentage === 0) {
      this.renderer.setStyle(rangeInput, 'background', `blue`);
    } else if (percentage === 1) {
      this.renderer.setStyle(rangeInput, 'background', `rgb(255, 0, ${pinkValue})`);
    } else {
      const newColor = `linear-gradient(90deg, blue 0%, blue ${percentage * 100}%, rgb(255, 0, ${pinkValue}) ${percentage * 100}%, rgb(255, 0, ${pinkValue}) 100%)`;
      this.renderer.setStyle(rangeInput, 'background', newColor);
    }
  }
  
  
}
