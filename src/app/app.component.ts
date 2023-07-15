import { Component } from '@angular/core';
import {EntitiesService} from "@core/services/entities.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon-guesser';
  constructor(private service: EntitiesService) {
   // this.service.getPokemons();
  }

  ngOnInit(): void { }
}
