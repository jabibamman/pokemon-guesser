import { Component, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { EntitiesService } from '@core/services/entities.service';
import { ViewportScroller } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { deletePokemon, loadPokemons } from '@core/store/pokemon.action';
import { selectPokemons } from '@core/store';
import { AppState } from '@core/store/app.state';
import { getPokemonList } from '@core/store/pokemon.selector';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit, OnChanges {
  pokemons$: Observable<Pokemon[]>;
  selectedPokemon?: Pokemon;
  allPokemons: Pokemon[] = []; 
  filteredPokemons: Pokemon[];

  constructor(private entitiesService: EntitiesService,
    private viewportScroller: ViewportScroller, private elementRef: ElementRef,
    private store: Store<AppState>) {
      this.pokemons$ = new Observable<Pokemon[]>();
      this.filteredPokemons = [];
   }

   ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    this.pokemons$ = this.store.select(getPokemonList);
    this.pokemons$.subscribe(pokemons => {
      this.allPokemons = pokemons;
      this.filteredPokemons = pokemons;
    });

    const storedSelectedPokemon = localStorage.getItem('selectedPokemon');
    if (storedSelectedPokemon) {
      this.selectedPokemon = JSON.parse(storedSelectedPokemon);
    }



    this.search('');
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  search(term: string) {
    this.filteredPokemons = this.allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
    const element = this.elementRef.nativeElement;
    this.viewportScroller.scrollToPosition([element.scrollLeft, element.offsetTop]);
  }


  onDeletePokemon(id: number): void {
      this.store.dispatch(deletePokemon({ id }));
      this.allPokemons = this.allPokemons.filter(pokemon => pokemon.number !== id);
      this.filteredPokemons = this.filteredPokemons.filter(pokemon => pokemon.number !== id);
      if (this.selectedPokemon?.number === id) {
        this.selectedPokemon = undefined;
        localStorage.removeItem('selectedPokemon');
      }
    }
  
  

}
