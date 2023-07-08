import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesComponent } from './entities.component';
import { EntitiesService } from '../../core/services/entities.service';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntitiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    FormsModule
  ],
  providers: [
    EntitiesService
  ]
})
export class EntitiesModule { }
