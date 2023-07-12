import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonNavbarComponent } from './pokemon-navbar.component';



@NgModule({
  declarations: [PokemonNavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PokemonNavbarComponent
  ]
})
export class PokemonNavbarModule { }
 