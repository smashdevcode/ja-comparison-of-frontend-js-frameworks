import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SearchCriteria {
  searchQuery: string;
  searchCategory: string;
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() categories: string[] = [];
  @Input() showSearchCriteria: boolean = false;
  @Output() onSearch = new EventEmitter<SearchCriteria>();
  @Output() onClearSearch = new EventEmitter();
  searchQuery: string = '';
  searchCategory: string = '';

  constructor() { }

  search() {
    this.onSearch.emit({
      searchQuery: this.searchQuery,
      searchCategory: this.searchCategory
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchCategory = '';
    this.onClearSearch.emit();
  }
}
