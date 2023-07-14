import { Injectable } from '@angular/core';
import { Pokemon } from "@core/models/pokemon.model";
import {HttpClient} from "@angular/common/http";
import { Observable, map, tap } from 'rxjs';
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
        const types: EntitiesTypes[] = [item.type1, item.type2]
          .filter(type => type !== 'none') as EntitiesTypes[];
        
        pokemon.types = types;
        pokemon.image = this.getImageUrl(pokemon.number, pokemon.name);
        return pokemon;
      })),
      tap(pokemons => {
        pokemons.forEach(pokemon => {
          if (pokemon.types.length === 0) {
            pokemon.types.push(EntitiesTypes.none);
          }
        });
      })
    );
  }
  
  
  private getImageUrl(id: number, name: string): string {
    const idString = id.toString().padStart(3, '0');
    const formattedName = idString + name;
  
    return `assets/pokemons/images/${formattedName}.webp`;
  }
}