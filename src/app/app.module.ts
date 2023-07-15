import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntitiesModule } from './modules/pages/entities/entities.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { effects, reducers } from '@core/store';
import { StoreModule } from '@ngrx/store';
import { GameModule } from './modules/pages/game/game.module';
import { AdminModule } from "@modules/pages/admin/admin.module";
import { ToastrModule } from 'ngx-toastr';
import {PokemonNavbarModule} from "@modules/components/pokemon-navbar";

@NgModule({
  exports: [],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    effects,
    HttpClientModule,
    EntitiesModule,
    GameModule,
    AdminModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PokemonNavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
