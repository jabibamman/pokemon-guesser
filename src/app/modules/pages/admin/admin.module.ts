import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminComponent } from './admin.component';
import { PokemonNavbarModule } from "@modules/components/pokemon-navbar";
import {SearchModule} from "@modules/components/search/search.module";
import {PokemonListModule} from "@modules/components/pokemon-list/pokemon-list.module";
import { PokemonCreateModule } from '@app/modules/components/admin/pokemon-create/pokemon-create.module';
import { PokemonDeleteModule } from '@app/modules/components/admin/pokemon-delete/pokemon-delete.module';


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PokemonNavbarModule,
    SearchModule,
    PokemonCreateModule,
    PokemonDeleteModule
  ]
})
export class AdminModule { }
