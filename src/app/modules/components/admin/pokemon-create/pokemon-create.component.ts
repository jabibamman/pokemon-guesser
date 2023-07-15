import {Component, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {Pokemon} from "@core/models/pokemon.model";
import {ExpSpeedTypes} from "@shared/enums/expspeed-types.enum";
import {EntitiesTypes} from "@shared/enums/entities-types.enum";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {EntitiesService} from "@core/services/entities.service";
import {Subscription} from "rxjs";
import {NotificationService} from "@core/services/notification.service";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {AppState} from "@core/store/app.state";
import {createPokemon} from "@core/store/pokemon.action";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls: ['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit, OnDestroy, OnChanges {
  private subscription: Subscription = new Subscription();
  pokemon: Pokemon;
  expSpeedOptions: ExpSpeedTypes[];
  typesOptions: EntitiesTypes[];
  typesOptionsNotNone: EntitiesTypes[];
  form: FormGroup;
  hideRange: boolean = false;
  fileToUpload: File;
  @Output() pokemonCreated: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();


  constructor(private store: Store<AppState>, private renderer: Renderer2, private el: ElementRef, private fb: FormBuilder,
              private entitiesService: EntitiesService, private notificationService: NotificationService,
              private http: HttpClient) {
    this.expSpeedOptions = Object.values(ExpSpeedTypes);
    this.typesOptions = Object.values(EntitiesTypes);
    this.typesOptionsNotNone = this.typesOptions.filter(type => type !== EntitiesTypes.none);
    this.form = this.fb.group({
      name: ['', Validators.required],
      malePct: [50, [Validators.min(0), Validators.max(100)]],
      type1: ['', Validators.required],
      type2: ['', Validators.required],
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
    this.pokemon.legendary = 0;
    this.fileToUpload = new File([], '');
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  updateFemalePercentage() {
    this.pokemon.femalePct = 100 - this.pokemon.malePct;
  }

  updateSliderColor(event: Event) {
    const rangeInput = event.target as HTMLInputElement;
    const newColor = `linear-gradient(90deg, rgb(96 165 250) 0%, rgb(96 165 250) ${this.pokemon.malePct}%, rgb(244 114 182) ${this.pokemon.malePct}%, rgb(244 114 182) 100%)`;
    this.renderer.setStyle(rangeInput, 'background', newColor);
  }

  updateGender() {
    if (this.hideRange) {
      this.pokemon.malePct = 0;
      this.pokemon.femalePct = 0;
    } else {
      this.pokemon.malePct = 50;
      this.pokemon.femalePct = 50;
    }
  }

  get types(): FormArray {
    return this.form.get('types') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      this.pokemon.types[0] = this.form.value.type1;
      this.pokemon.types[1] = this.form.value.type2;
      this.pokemon.baseTotal = this.pokemon.hp + this.pokemon.attack + this.pokemon.defense + this.pokemon.special + this.pokemon.speed;
      this.pokemon.image = this.form.value.image;
      this.pokemon.number = this.entitiesService.getLastPokemonNumber()+1;

      console.log(this.pokemon);
      this.subscription.add(
        this.entitiesService.createPokemon(this.pokemon).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
            this.notificationService.showError('An error occured while creating the pokemon', 'Error');
            return;
          }
        )
      );

      this.entitiesService.saveImageToLocalStorage(this.form.value.image);

      this.store.dispatch(createPokemon({ pokemon: this.pokemon }));

      this.pokemonCreated.emit(this.pokemon);

      this.notificationService.showSuccess(this.pokemon.name +' has been created!', 'Success');
      this.resetForm();
    } else {
      this.notificationService.showError('Please fill all the required fields', 'Error');
    }
  }

  resetForm() {
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateFormValues(): void {
    if (this.pokemon) {
      this.form.patchValue({
        image: this.pokemon.image,
        name: this.pokemon.name,
        type1: this.pokemon.types[0],
        type2: this.pokemon.types[1] || '',
        height: this.pokemon.height,
        weight: this.pokemon.weight,
        malePct: this.pokemon.malePct,
        femalePct: this.pokemon.femalePct,
        captRate: this.pokemon.captRate,
        expPoints: this.pokemon.expPoints,
        expSpeed: this.pokemon.expSpeed,
        hp: this.pokemon.hp,
        attack: this.pokemon.attack,
        defense: this.pokemon.defense,
        special: this.pokemon.special,
        speed: this.pokemon.speed,
        evolutions: this.pokemon.evolutions,
        legendary: this.pokemon.legendary,
      });
    }
  }


  ngOnChanges(): void {
    this.updateFormValues();
  }

}
