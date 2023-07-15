import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonEditComponent } from './pokemon-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [PokemonEditComponent],
  imports: [
    CommonModule, FormsModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  exports: [
    PokemonEditComponent
  ]
})
export class PokemonEditModule { }
 