import {Component, ElementRef, OnInit, Renderer2} from "@angular/core";
import {Pokemon} from "@core/models/pokemon.model";
import {ExpSpeedTypes} from "@shared/enums/expspeed-types.enum";
import {EntitiesTypes} from "@shared/enums/entities-types.enum";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit {
  pokemon: Pokemon;
  expSpeedOptions: ExpSpeedTypes[];
  typesOptions: EntitiesTypes[];
  typesOptionsNotNone: EntitiesTypes[];
  form: FormGroup;


  constructor(private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder) {
    this.expSpeedOptions = Object.values(ExpSpeedTypes);
    this.typesOptions = Object.values(EntitiesTypes);
    this.typesOptionsNotNone = this.typesOptions.filter(type => type !== EntitiesTypes.none);
    this.form = this.fb.group({
      name: ['', Validators.required],
      malePct: [50, [Validators.min(0), Validators.max(100)]],
      types: this.fb.array([
        EntitiesTypes.none,
        EntitiesTypes.none,
      ]),
      height: ['', Validators.required],
      weight: ['', Validators.required],
      captRate: ['', Validators.required],
      expPoints: ['', Validators.required],
      expSpeed: ['', Validators.required],
      hp: ['', Validators.required],
      attack: ['', Validators.required],
      defense: ['', Validators.required],
      special: ['', Validators.required],
      speed: ['', Validators.required],
      evolutions: ['', Validators.required],
      legendary: [false],
    })
    this.pokemon = new Pokemon();
    this.pokemon.malePct = 50;
    this.updateFemalePercentage()
    this.pokemon.types[0] = EntitiesTypes.Bug;
    this.pokemon.types[1] = EntitiesTypes.none;
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }

  updateFemalePercentage() {
    this.pokemon.femalePct = 100 - this.pokemon.malePct;
  }

  updateSliderColor(event: Event) {
    const rangeInput = event.target as HTMLInputElement;
    const newColor = `linear-gradient(90deg, rgb(96 165 250) 0%, rgb(96 165 250) ${this.pokemon.malePct}%, rgb(244 114 182) ${this.pokemon.malePct}%, rgb(244 114 182) 100%)`;
    this.renderer.setStyle(rangeInput, 'background', newColor);
  }

  get types(): FormArray {
    return this.form.get('types') as FormArray;
  }

  onSubmit() {
    console.log(this.form.value);

    //TODO: ajouter le pokemon au json
  }



}
