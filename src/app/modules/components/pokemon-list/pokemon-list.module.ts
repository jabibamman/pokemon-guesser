import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule


  ],
  exports: [
    PokemonListComponent
  ]
})
export class PokemonListModule { }
