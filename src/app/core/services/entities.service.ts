import { Injectable } from '@angular/core';
import { Pokemon } from "@core/models/pokemon.model";
import {HttpClient} from "@angular/common/http";
import { Observable, map } from 'rxjs';
import { EntitiesTypes } from '@shared/enums/entities-types.enum';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  jsonData: any;
  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<[any]>('assets/pokemons/Data.json').pipe(
      map(data => data.map(item => {
        const pokemon = Object.assign(new Pokemon(), item);
        pokemon.types = [item.type1, item.type2].filter(Boolean) as EntitiesTypes[];
        pokemon.image = this.getImageUrl(pokemon.number, pokemon.name);
        return pokemon;
      }))
    );
  }
  private getImageUrl(id: number, name: string ): string {
    let idString = id.toString();
    if (idString.length === 1) {
      idString = "00" + idString;
    } else if (idString.length === 2) {
      idString = "0" + idString;
    }

    const formattedName = idString+name;
    return `assets/pokemons/images/${formattedName}.webp`;
  }
}