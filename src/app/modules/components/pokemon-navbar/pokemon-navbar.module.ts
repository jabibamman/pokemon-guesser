import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonNavbarComponent } from './pokemon-navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PokemonNavbarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PokemonNavbarComponent
  ]
})
export class PokemonNavbarModule { }
 