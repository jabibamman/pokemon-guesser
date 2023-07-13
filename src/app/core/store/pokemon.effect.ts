import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EntitiesService } from '@core/services/entities.service';
import { loadPokemons, loadPokemonsSuccess } from './pokemon.action';

@Injectable()
export class PokemonEffects {

  loadPokemons$ = createEffect(() => this.actions$.pipe(
    ofType(loadPokemons),
    mergeMap(() => this.entitiesService.getPokemons()
      .pipe(
        map(pokemons => loadPokemonsSuccess({ pokemons })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private entitiesService: EntitiesService
  ) {}
}
