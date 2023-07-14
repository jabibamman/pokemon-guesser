import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PokemonCreateComponent} from "@app/modules/components/admin/pokemon-create/pokemon-create.component";
import {FormsModule} from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    PokemonCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule
  ],
  exports: [
    PokemonCreateComponent
  ]
})
export class PokemonCreateModule { }
