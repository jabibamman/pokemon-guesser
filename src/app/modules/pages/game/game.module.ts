import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { FormsModule } from '@angular/forms';
import { PokemonNavbarModule } from '@app/modules/components/pokemon-navbar';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PokemonNavbarModule
  ]
})
export class GameModule { }
