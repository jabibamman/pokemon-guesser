import { NotificationService } from './../../../core/services/notification.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemons } from '@core/store/pokemon.action';
import { selectPokemons } from '@core/store/index';
import { Pokemon } from '@core/models/pokemon.model';
import { Observable, Subscription, map, take } from 'rxjs';
import { AppState } from '@core/store/app.state';
import { ToastrService } from 'ngx-toastr';
import { decrementRemainingGuesses, makeGuess, startNewGame } from '@core/store/game.action';
import { GameState, setGameStarted, setTargetPokemon } from '@core/store/game.state';

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
  private subscription: Subscription = new Subscription();
  @ViewChild('levelUpSound') levelUpSound!: ElementRef<HTMLAudioElement>;


  constructor(private store: Store<AppState>, private toastr: ToastrService, protected notificationService: NotificationService) {
    this.targetPokemon = new Pokemon();
    this.pokemons$ = this.store.select(selectPokemons);
    this.gameState$ = this.store.select('game');
    this.remainingGuesses$ = this.store.select(state => state.game.remainingGuesses);
}

  ngOnInit(): void {
    this.store.dispatch(loadPokemons());
    this.toastr.toastrConfig.positionClass = 'toast-center-right';
    this.toastr.toastrConfig.timeOut = 15000;

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
      this.store.dispatch(setGameStarted({ gameStarted: true }));
      this.store.dispatch(startNewGame());
      this.notificationService.sendMessage('game started');
    }
  }
  

  handleGuess(): void {
    if (!this.gameStarted) {
      this.toastr.error("The game hasn't started yet. Press 'Start Game' to start.", 'Error');
      return;
    }
  
    if (this.remainingGuesses <= 0) {
      this.notificationService.sendMessage('game over');
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
          if (this.guessedPokemon === this.targetPokemon) {
            this.notificationService.sendMessage('correct guess');
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
              this.hintMessage.push(this.compareStats(this.guessedPokemon, stat));
            }
  
            this.notificationService.sendMessage('incorrect guess', this.hintMessage);
          }
          this.store.dispatch(decrementRemainingGuesses());
        } else {
          this.toastr.error("This Pokémon is not in the list. Try again!", 'Error');
        }
      });
  }
  
  compareStats(guessedPokemon: Pokemon, stat: keyof Pokemon): string {
    if (guessedPokemon[stat] > this.targetPokemon[stat]) {
      return `The target Pokémon has lower ${stat}!\n`;
    } else if (guessedPokemon[stat] < this.targetPokemon[stat]) {
      return `The target Pokémon has higher ${stat}!\n`;
    } else {
      return `The target Pokémon has the same ${stat}!\n`;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
}
