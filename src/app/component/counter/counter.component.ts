import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  cmpt = 0;

  increment() {
    this.cmpt++;
  }
  decrement() {
    this.cmpt--;
  }
}
