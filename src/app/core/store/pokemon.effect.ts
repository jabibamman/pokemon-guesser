import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EntitiesService } from '@core/services/entities.service';
import { deletePokemon,deletePokemonFailed, deletePokemonSuccess, loadPokemons, loadPokemonsSuccess, updatePokemon, updatePokemonFailed, updatePokemonSuccess } from './pokemon.action';
import { of } from 'rxjs';

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

  deletePokemon$ = createEffect(() => this.actions$.pipe(
    ofType(deletePokemon),
      mergeMap((action) => this.entitiesService.deletePokemon(action.id).pipe(
          map(id => deletePokemonSuccess({ id })),
          catchError((error) => of(deletePokemonFailed({ error }))),
        ),
      ),
    ));
    
  updatePokemon$ = createEffect(() => this.actions$.pipe(
      ofType(updatePokemon),
      mergeMap((action) => this.entitiesService.updatePokemon(action.pokemon).pipe(
        map(pokemon => updatePokemonSuccess({ pokemon })),
        catchError((error) => of(updatePokemonFailed({ error }))),
      ),
    ),
  ));
  constructor(
    private actions$: Actions,
    private entitiesService: EntitiesService
  ) {}
}
