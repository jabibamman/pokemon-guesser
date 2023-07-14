import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PokemonCreateComponent} from "@modules/components/pokemon-create/pokemon-create.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PokemonCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PokemonCreateComponent
  ]
})
export class PokemonCreateModule { }
