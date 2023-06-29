import { Injectable } from '@angular/core';
import {EntitiesModel} from "@core/models/entities.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  jsonData: any;
  constructor(private http: HttpClient) { }

  getEntities(): void { //EntitiesModel[] {
    this.http.get('assets/pokemons/Data.json').subscribe(data => {
      this.jsonData = data;
        console.log(this.jsonData);
    });
  }
}
