import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteComponent } from './modules/pages/admin/delete/delete.component';
import { CreateComponent } from './modules/pages/admin/create/create.component';
import { UpdateComponent } from './modules/pages/admin/update/update.component';
import { DuplicateComponent } from './modules/pages/admin/duplicate/duplicate.component';
import { DetailsComponent } from './modules/pages/details/details.component';
import { EntitiesModule } from './modules/pages/entities/entities.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { effects, reducers } from '@core/store';
import { StoreModule } from '@ngrx/store';
import { GameModule } from './modules/pages/game/game.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    DeleteComponent,
    CreateComponent,
    UpdateComponent,
    DuplicateComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    effects,
    HttpClientModule,
    EntitiesModule,
    GameModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
