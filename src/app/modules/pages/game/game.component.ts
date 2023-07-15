import { NotificationService } from './../../../core/services/notification.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadPokemons } from '@core/store/pokemon.action';
import { selectPokemons } from '@core/store/index';
import { Pokemon } from '@core/models/pokemon.model';
import { Observable, Subscription, map, of, take } from 'rxjs';
import { AppState } from '@core/store/app.state';
import { ToastrService } from 'ngx-toastr';
import { addGuessedPokemon, decrementRemainingGuesses, makeGuess, resetGuessedPokemons, resetHints, startNewGame } from '@core/store/game.action';
import { GameState, setGameStarted, setTargetPokemon } from '@core/store/game.state';
import { selectGuessedPokemonsHints } from '@core/store/game.selector';
import { addHint } from '@core/store/game.action';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  pokemons$: Observable<Pokemon[]>;
  remainingGuesses: number = 5;
  userGuess: string = '';
  hintMessage: string[][] = [];
  gameStarted: boolean = false;
  guessedPokemon: Pokemon | null = null;
  gameState$: Observable<GameState>;
  remainingGuesses$: Observable<number>;
  hintMessage$: Observable<string[][]>;
  guessedPokemons$: Observable<Pokemon[]>;
  guessedPokemonsHints$: Observable<string[][]>;
  targetPokemon$: Observable<Pokemon | null>;

  private subscription: Subscription = new Subscription();
  @ViewChild('levelUpSound') levelUpSound!: ElementRef<HTMLAudioElement>;
  @ViewChild('pokemonBattleSound') pokemonBattleSound!: ElementRef<HTMLAudioElement>;
  @ViewChild('youWereClose') youWereClose!: ElementRef<HTMLAudioElement>;
  targetPokemon: Pokemon;

  constructor(private store: Store<AppState>, private toastr: ToastrService, protected notificationService: NotificationService) {
    this.pokemons$ = this.store.select(selectPokemons);
    this.gameState$ = this.store.select('game');
    this.remainingGuesses$ = this.store.select(state => state.game.remainingGuesses);
    this.hintMessage$ = this.store.select(state => state.game.hintMessage);
    this.guessedPokemons$ = this.store.select(state => state.game.guessedPokemons);
    this.guessedPokemonsHints$ = this.store.pipe(select(selectGuessedPokemonsHints));
    this.targetPokemon = new Pokemon();
    this.targetPokemon$ = of(null);

  }

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    this.toastr.toastrConfig.positionClass = 'toast-top-left';
    this.toastr.toastrConfig.timeOut = 8000;

    this.subscription.add(
      this.pokemons$.subscribe(pokemons => {
        this.targetPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        this.store.dispatch(setTargetPokemon({ pokemon: this.targetPokemon }));
      })
    );

    this.subscription.add(
      this.gameState$.subscribe(gameState => {
        this.gameStarted = gameState.gameStarted;
      })
    );

    this.subscription.add(
      this.notificationService.message$.subscribe(message => {
        if (message === 'game over') {
          this.store.dispatch(setGameStarted({ gameStarted: false }));
        }
      })
    );

    this.subscription.add(
      this.remainingGuesses$.subscribe(remainingGuesses => {
        this.remainingGuesses = remainingGuesses;
      })
    );

    this.subscription.add(
      this.hintMessage$.subscribe(hintMessage => {
        this.hintMessage = hintMessage;
      }
      ));

    this.subscription.add(
      this.guessedPokemonsHints$.subscribe(hintMessages => {
        this.hintMessage.push(hintMessages[hintMessages.length - 1]);
      }
      ));

    this.subscription.add(
      this.guessedPokemons$.subscribe(guessedPokemons => {
        if (guessedPokemons.length > 0) {
          this.guessedPokemon = guessedPokemons[guessedPokemons.length - 1];
        }
      }
      ));

  }

  startNewGame(): void {
    if (!this.gameStarted) {
      this.notificationService.sendMessage('game started');
      this.store.dispatch(setGameStarted({ gameStarted: true }));
      this.store.dispatch(startNewGame());
      this.store.dispatch(resetHints());
      this.store.dispatch(resetGuessedPokemons());

      this.pokemons$
        .pipe(take(1))
        .subscribe(pokemons => {
          this.targetPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
          this.store.dispatch(setTargetPokemon({ pokemon: this.targetPokemon }));
        });

        this.targetPokemon$ = this.store.pipe(select(state => state.game.targetPokemon));


      this.pokemonBattleSound.nativeElement.play();
    }
}


  handleGuess(event: any): void {
    event.preventDefault();
    if (!this.gameStarted) {
      this.toastr.error("The game hasn't started yet. Press 'Start Game' to start.", 'Error');
      return;
    }

    if (this.remainingGuesses <= 0) {
      this.notificationService.sendMessage('game over');
      this.youWereClose.nativeElement.play();
      return;
    }

    this.store.dispatch(makeGuess({ guess: this.userGuess }));

    this.pokemons$
      .pipe(
        take(1),
        map(pokemons => pokemons.find(pokemon => pokemon.name.toLowerCase() === this.userGuess.toLowerCase()))
      )
      .subscribe(tempPokemon => {
        this.guessedPokemon = tempPokemon ? tempPokemon : null;
        if (this.guessedPokemon) {
          let hint = this.getHint(this.userGuess, this.targetPokemon);
          let formattedHint = hint.join('\n');
          this.store.dispatch(addHint({ hint: formattedHint }));
          this.store.dispatch(addGuessedPokemon({ pokemon: this.guessedPokemon, hint: formattedHint }));

          if (this.guessedPokemon === this.targetPokemon) {
            this.notificationService.sendMessage('correct guess');
            this.pokemonBattleSound.nativeElement.pause();
            this.levelUpSound.nativeElement.play();
            this.store.dispatch(setGameStarted({ gameStarted: false }));
          }
        } else {
          this.toastr.info('Please enter a valid Pokémon name.', 'Invalid Pokémon');
        }

        this.store.dispatch(decrementRemainingGuesses());

      });
  }
  compareStats(guessedPokemon: Pokemon, targetPokemon: Pokemon, stat: keyof Pokemon): void {
    const comparison =
      guessedPokemon[stat] > targetPokemon[stat]
        ? "higher"
        : guessedPokemon[stat] < targetPokemon[stat]
          ? "lower"
          : "equal";

    this.addHintMessage([`The ${stat} of your guess is ${comparison} than the target Pokémon.`]);
  }

  endGame(): void {
    this.store.dispatch(setGameStarted({ gameStarted: false }));
    this.notificationService.sendMessage('game over');
    this.pokemonBattleSound.nativeElement.pause();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getHint(userGuess: string, targetPokemon: Pokemon | null): string[] {
    let hint: string[] = [];
    const stats: (keyof Pokemon)[] = ["hp", "attack", "defense", "speed"];
  
    if (!this.gameStarted) {
      return hint;
    }
  
    this.pokemons$
      .pipe(
        take(1),
        map(pokemons => pokemons.find(pokemon => pokemon.name.toLowerCase() === userGuess.toLowerCase()))
      )
      .subscribe(guessedPokemon => {
        if (guessedPokemon && targetPokemon) {
          for (let stat of stats) {
            if (stat !== 'types') {
              if (guessedPokemon[stat] > targetPokemon[stat]) {
                hint.push(`The target Pokemon has less ${stat} than your guessed Pokemon.`);
              } else if (guessedPokemon[stat] < targetPokemon[stat]) {
                hint.push(`The target Pokemon has more ${stat} than your guessed Pokemon.`);
              } else {
                hint.push(`Your guessed Pokemon and the target Pokemon have the same ${stat}.`);
              }
            }
          }
  
          const commonTypes = guessedPokemon.types.filter(type => type !== 'none' && targetPokemon.types.includes(type));
          if (commonTypes.length > 0) {
            hint.push(`Your guessed Pokemon shares these type(s) with the target Pokemon: ${commonTypes.join(', ')}`);
          } else {
            hint.push(`Your guessed Pokemon doesn't share any type with the target Pokemon.`);
          }
        } else {
          hint.push('The guessed Pokemon was not found.');
        }
      });
  
    return hint;
  }
  addHintMessage(message: string[]): void {
    this.hintMessage.push(message);

  }

} 
