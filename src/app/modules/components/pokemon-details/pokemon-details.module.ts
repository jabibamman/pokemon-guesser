import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { MatCardModule } from '@angular/material/card';
import { PokemonDeleteModule } from '../admin/pokemon-delete/pokemon-delete.module';



@NgModule({
  declarations: [
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PokemonDeleteModule
  ],
  exports: [
    PokemonDetailsComponent
  ]
})
export class PokemonDetailsModule {
 }
