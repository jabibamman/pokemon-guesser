import { Injectable } from '@angular/core';
import { Pokemon } from "@core/models/pokemon.model";
import {HttpClient} from "@angular/common/http";
import { Observable, map, of, tap, } from 'rxjs';
import { EntitiesTypes } from '@shared/enums/entities-types.enum';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  constructor(private http: HttpClient,
    private sanitizer: DomSanitizer) {
  }

  getPokemons(): Observable<Pokemon[]> {
    const storedPokemons = localStorage.getItem('pokemons');
    if (storedPokemons) {
      return of(JSON.parse(storedPokemons));
    }

    return this.http.get<[any]>('assets/pokemons/Data.json').pipe(
      map(data => data.map(item => {
        const pokemon = Object.assign(new Pokemon(), item);
        const types: EntitiesTypes[] = [item.type1, item.type2].filter(type => type !== EntitiesTypes.none);
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
      }),
      tap(pokemons => {
        localStorage.setItem('pokemons', JSON.stringify(pokemons));
      })
    );
  }

  private getImageUrl(id: number, name: string): string {
    const idString = id.toString().padStart(3, '0');
    const formattedName = idString + name;

    return `assets/pokemons/images/${formattedName}.webp`;
  }

  getLastPokemonNumber(): number {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    return storedPokemons.length;
  }

  deletePokemon(id: number): Observable<number> {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    const index = storedPokemons.findIndex((pokemon: Pokemon) => pokemon.number === id);

    if (index !== -1) {
      storedPokemons.splice(index, 1);
      localStorage.setItem('pokemons', JSON.stringify(storedPokemons));
    }

    return of(id);
  }

  updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    const index = storedPokemons.findIndex((p: Pokemon) => p.number === pokemon.number);
    
    if (index !== -1) {
      storedPokemons[index] = pokemon;
      localStorage.setItem('pokemons', JSON.stringify(storedPokemons));
    }
  
    return of(pokemon);
  }

  clonePokemon(pokemon: Pokemon): Observable<Pokemon> {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    const newPokemon = Object.assign(new Pokemon(), pokemon);
    newPokemon.number = storedPokemons.length + 1;
    newPokemon.image = this.getImageUrl(newPokemon.number, newPokemon.name);
    storedPokemons.push(newPokemon);
    localStorage.setItem('pokemons', JSON.stringify(storedPokemons));

    return of(newPokemon);
  }
  createPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
    const newPokemon = Object.assign(new Pokemon(), pokemon);
    newPokemon.number = storedPokemons.length + 1;
    newPokemon.image = this.getImageUrl(newPokemon.number, newPokemon.name);
    storedPokemons.push(newPokemon);
    localStorage.setItem('pokemons', JSON.stringify(storedPokemons));

    return of(newPokemon);
  }


  saveImageToLocalStorage(imageUrl: string): void {
    let image = new Image();
    image.src = imageUrl;
    image.onload = function () {
      let canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      let ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0, image.width, image.height);
        let dataURL = canvas.toDataURL();
        localStorage.setItem('pokemonImage', dataURL);
      }
    };
  }
}

