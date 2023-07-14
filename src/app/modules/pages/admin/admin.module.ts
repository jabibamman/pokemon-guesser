import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminComponent } from "@modules/pages/admin/admin.component";
import { PokemonNavbarModule } from "@modules/components/pokemon-navbar";
import {SearchModule} from "@modules/components/search/search.module";
import {PokemonListModule} from "@modules/components/pokemon-list/pokemon-list.module";
import {PokemonCreateModule} from "@modules/components/pokemon-create/pokemon-create.module";



@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PokemonNavbarModule,
    SearchModule,
    PokemonListModule,
    PokemonCreateModule
  ]
})
export class AdminModule { }
