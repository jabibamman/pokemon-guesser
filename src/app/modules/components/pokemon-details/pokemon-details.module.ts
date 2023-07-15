import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { MatCardModule } from '@angular/material/card';
import { PokemonDeleteModule } from '../admin/pokemon-delete/pokemon-delete.module';
import { PokemonEditModule } from '../admin/pokemon-edit/pokemon-edit.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PokemonDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    PokemonDeleteModule,
    PokemonEditModule,
    FormsModule
  ],
  exports: [
    PokemonDetailsComponent
  ]
})
export class PokemonDetailsModule {
 }
