import { Component, ElementRef, OnInit } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { EntitiesService } from '@core/services/entities.service';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadPokemons } from '@core/store/pokemon.action';
import { selectPokemons } from '@core/store';
import { AppState } from '@core/store/app.state';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit {
  pokemons$: Observable<Pokemon[]>;
  selectedPokemon?: Pokemon;
  allPokemons: Pokemon[] = []; // Variable pour stocker tous les pokémons
  filteredPokemons: Pokemon[];

  constructor(private entitiesService: EntitiesService,
    private viewportScroller: ViewportScroller, private elementRef: ElementRef,
    private store: Store<AppState>) {
      this.pokemons$ = new Observable<Pokemon[]>();
      this.filteredPokemons = [];
   }

   ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    this.pokemons$ = this.store.select(selectPokemons);
    this.pokemons$.subscribe(pokemons => {
      this.allPokemons = pokemons; // Stocker tous les pokémons
      this.filteredPokemons = pokemons; // Initialiser les pokémons filtrés avec la liste complète
    });

    this.search('');
  }

  search(term: string) {
    this.filteredPokemons = this.allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    const element = this.elementRef.nativeElement;
    this.viewportScroller.scrollToPosition([element.scrollLeft, element.offsetTop]);
  }
}
