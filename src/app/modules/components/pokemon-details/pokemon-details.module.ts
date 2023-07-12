import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    PokemonDetailsComponent
  ]
})
export class PokemonDetailsModule {
 }
