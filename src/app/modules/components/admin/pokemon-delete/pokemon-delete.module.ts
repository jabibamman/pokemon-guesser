import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { PokemonDeleteComponent } from "./pokemon-delete.component";
import { FormsModule } from "@angular/forms";
@NgModule({
  declarations: [
    PokemonDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
 
  ],
  exports: [
    PokemonDeleteComponent
  ]
})
export class PokemonDeleteModule { }
