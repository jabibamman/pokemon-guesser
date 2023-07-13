import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { pokemonReducer } from './pokemon.reducer';
import { AppState } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './pokemon.effect';
import { Pokemon } from '@core/models/pokemon.model';

export const reducers: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer
};

export const effects = [
  EffectsModule.forRoot([PokemonEffects])
];

export const selectPokemons = createSelector(
  (state: AppState) => state.pokemons,
  (pokemons: Pokemon[]) => pokemons
);