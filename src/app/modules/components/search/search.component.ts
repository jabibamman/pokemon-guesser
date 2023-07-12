import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();
  
}
