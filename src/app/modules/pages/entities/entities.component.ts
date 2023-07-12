import { Component, ElementRef, OnInit } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { EntitiesService } from '@core/services/entities.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html'
})
export class EntitiesComponent implements OnInit {
  pokemons: Pokemon[];
  selectedPokemon?: Pokemon;
  filteredPokemons: Pokemon[] = [];

  constructor(private entitiesService: EntitiesService,
    private viewportScroller: ViewportScroller, private elementRef: ElementRef) {
      this.pokemons = [];
   }

   ngOnInit(): void {
    this.entitiesService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons;
      this.filteredPokemons = this.pokemons;
    });
    this.search('');
  }

  search(term: string) {
    this.filteredPokemons = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }

  selectPokemon(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
  
    const element = this.elementRef.nativeElement;
    this.viewportScroller.scrollToPosition([element.scrollLeft, element.offsetTop]);
  }

   
} 