import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './modules/pages/entities/entities.component';
import { GameComponent } from './modules/pages/game/game.component';
import {AdminComponent} from "@modules/pages/admin/admin.component";
const routes: Routes = [
  { path: 'entities', component: EntitiesComponent },
  { path: 'game', component: GameComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'entities' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
