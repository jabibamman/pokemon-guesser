import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteComponent } from './modules/admin/delete/delete.component';
import { CreateComponent } from './modules/admin/create/create.component';
import { UpdateComponent } from './modules/admin/update/update.component';
import { DuplicateComponent } from './modules/admin/duplicate/duplicate.component';
import { EntitiesComponent } from './modules/entities/entities.component';
import { DetailsComponent } from './modules/details/details.component';

@NgModule({
  exports: [],
  declarations: [
    AppComponent,
    DeleteComponent,
    CreateComponent,
    UpdateComponent,
    DuplicateComponent,
    EntitiesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
