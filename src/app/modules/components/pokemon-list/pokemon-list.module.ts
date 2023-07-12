import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    PokemonListComponent
  ]
})
export class PokemonListModule { }
