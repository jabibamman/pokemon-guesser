import { NotificationService } from './../../../core/services/notification.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadPokemons } from '@core/store/pokemon.action';
import { selectPokemons } from '@core/store/index';
import { Pokemon } from '@core/models/pokemon.model';
import { Observable, Subscription, map, take } from 'rxjs';
import { AppState } from '@core/store/app.state';
import { ToastrService } from 'ngx-toastr';
import { addGuessedPokemon, addHintMessage, decrementRemainingGuesses, makeGuess, startNewGame } from '@core/store/game.action';
import { GameState, setGameStarted, setTargetPokemon } from '@core/store/game.state';
import { selectGuessedPokemonsHints } from '@core/store/game.selector';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  pokemons$: Observable<Pokemon[]>;
  targetPokemon: Pokemon;
  remainingGuesses: number = 5;
  userGuess: string = '';
  hintMessage: string[] = [];
  gameStarted: boolean = false;
  guessedPokemon: Pokemon | null = null;
  gameState$: Observable<GameState>;
  remainingGuesses$: Observable<number>;
  hintMessage$: Observable<string[]>;
  guessedPokemons$: Observable<Pokemon[]>;
  guessedPokemonsHints$: Observable<string[]>;

  private subscription: Subscription = new Subscription();
  @ViewChild('levelUpSound') levelUpSound!: ElementRef<HTMLAudioElement>;
  @ViewChild('pokemonBattleSound') pokemonBattleSound!: ElementRef<HTMLAudioElement>;
  @ViewChild('youWereClose') youWereClose!: ElementRef<HTMLAudioElement>;

  constructor(private store: Store<AppState>, private toastr: ToastrService, protected notificationService: NotificationService) {
    this.targetPokemon = new Pokemon();
    this.pokemons$ = this.store.select(selectPokemons);
    this.gameState$ = this.store.select('game');
    this.remainingGuesses$ = this.store.select(state => state.game.remainingGuesses);
    this.hintMessage$ = this.store.select(state => state.game.hintMessage);
    this.guessedPokemons$ = this.store.select(state => state.game.guessedPokemons);
    this.guessedPokemonsHints$ = this.store.pipe(select(selectGuessedPokemonsHints));
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

  }

  startNewGame(): void {
    if (!this.gameStarted) {
      this.notificationService.sendMessage('game started');
      this.store.dispatch(setGameStarted({ gameStarted: true }));
      this.store.dispatch(startNewGame());
      this.pokemonBattleSound.nativeElement.play();
    }
  }
  

  handleGuess(): void {
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
          this.store.dispatch(addGuessedPokemon({ pokemon: this.guessedPokemon }));

          if (this.guessedPokemon === this.targetPokemon) {
            this.notificationService.sendMessage('correct guess');
            this.pokemonBattleSound.nativeElement.pause();
            this.levelUpSound.nativeElement.play();
            this.store.dispatch(setGameStarted({ gameStarted: false }));
            this.pokemons$
            .pipe(
              take(1),
              map(pokemons => pokemons[Math.floor(Math.random() * pokemons.length)])
            )
            .subscribe(newTargetPokemon => {
              this.targetPokemon = newTargetPokemon;
              this.store.dispatch(setTargetPokemon({ pokemon: newTargetPokemon }));
            });
          } else {
            this.hintMessage = [];
            const stats: (keyof Pokemon)[] = ["hp", "attack", "defense", "speed"];
            for (let stat of stats) {
              this.compareStats(this.guessedPokemon, stat);
            }
  
            this.notificationService.sendMessage('incorrect guess', this.hintMessage);
          }
          this.store.dispatch(decrementRemainingGuesses());
        } else {
          this.notificationService.sendMessage('incorrect guess', ['This Pokémon is not in the list. Try again!']);
        }
      }); 
  }
  
  compareStats(guessedPokemon: Pokemon, stat: keyof Pokemon): void {
    this.addHintMessage(`The target Pokémon has lower ${stat}!`);
  }

  endGame(): void {
    this.store.dispatch(setGameStarted({ gameStarted: false }));
    this.notificationService.sendMessage('game over');
    this.pokemonBattleSound.nativeElement.pause();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addHintMessage(message: string): void {
    this.store.dispatch(addHintMessage({ message }));
  }

  getHint(i: number): Observable<string> {
  return this.guessedPokemonsHints$.pipe(
    map(hints => hints[i])
  );
}
}
