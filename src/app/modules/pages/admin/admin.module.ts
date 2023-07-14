import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { AdminComponent } from "@modules/pages/admin/admin.component";
import { PokemonNavbarModule } from "@modules/components/pokemon-navbar";



@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PokemonNavbarModule
  ]
})
export class AdminModule { }
