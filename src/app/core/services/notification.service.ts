import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new Subject<string>();
  message$ = new Subject<string>();
  
  constructor(private toastr: ToastrService) { }
  
  sendMessage(message: string, hintMessage?: string[]) {
    this.message$.next(message);
    switch (message) {
      case 'game over':
        this.showError('Game over, you have no more guesses left.', 'Game Over');
        break;
      case 'game started':
        this.showSuccess('The game has started. Make your guess!', 'Game Started');
        break;
      case 'correct guess':
        this.showSuccess('You guessed correctly! You win!', 'Correct Guess');
        break;
      case 'incorrect guess':
        if (hintMessage) {
          for (let mess of hintMessage) {
            this.showInfo(mess, 'Hint', 12000);
            
          }
          return;
        }

        this.showWarning('You guessed incorrectly. Try again!', 'Incorrect Guess');
        break;
      case 'game already started':
        this.showError("The game has already started. Press 'Guess' to make a guess.", 'Error');
        break;
    }
  }
 

  showSuccess(message: string, title: string){
      this.toastr.success(message, title)
  }
  
  showError(message: string, title: string){
      this.toastr.error(message, title)
  }
  
  showInfo(message: string, title: string, timeOut: number) {
    if (timeOut) {
      this.toastr.info(message, title, {
        positionClass: 'toast-bottom-right',
        timeOut: timeOut,
        progressBar: true,
        progressAnimation: 'increasing',
        closeButton: true,
      });
      return;
    }
    this.toastr.info(message, title);
  }
  
  
  showWarning(message: string, title: string){
      this.toastr.warning(message, title)
  }

  
}
