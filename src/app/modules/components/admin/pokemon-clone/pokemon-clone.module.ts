import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCloneComponent } from './pokemon-clone.component';



@NgModule({
  declarations: [PokemonCloneComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PokemonCloneComponent
  ]
})
export class PokemonCloneModule { }
