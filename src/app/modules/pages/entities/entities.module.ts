import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesComponent } from './entities.component';
import { EntitiesService } from '@core/services/entities.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { PokemonNavbarModule } from '@app/modules/components/pokemon-navbar';
import { SearchModule } from '@app/modules/components/search/search.module';
import { PokemonDetailsModule } from '@app/modules/components/pokemon-details/pokemon-details.module';
import { PokemonListModule } from '@app/modules/components/pokemon-list/pokemon-list.module';

@NgModule({
  declarations: [
    EntitiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    PokemonNavbarModule,
    SearchModule,
    PokemonDetailsModule,
    PokemonListModule
  ],
  providers: [
    EntitiesService
  ]
})
export class EntitiesModule { }
