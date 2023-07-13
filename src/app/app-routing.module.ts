import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './modules/pages/entities/entities.component';
import { GameComponent } from './modules/pages/game/game.component';
const routes: Routes = [
  { path: 'entities', component: EntitiesComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: 'entities' }
];  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
