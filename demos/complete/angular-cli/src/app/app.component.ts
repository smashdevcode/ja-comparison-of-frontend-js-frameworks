import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import Album from './models/album';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SearchCriteria } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  appName = 'Music Library';
  categories: string[] = [];
  albums: Album[] = [];
  searchResults: Album[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const categories = this.dataService.getCategories();
    const albums = this.dataService.getAlbums();

    forkJoin([categories, albums]).subscribe(results => {
      this.categories = results[0];
      this.albums = results[1];

      this.resetSearchResults();
    });
  }

  search(searchCriteria: SearchCriteria) {
    const { searchQuery, searchCategory } = searchCriteria;

    if (searchQuery || searchCategory) {
      let searchResults = [];

      if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        searchResults = this.albums
          .filter(album =>
            album.title.toLowerCase().includes(lowerCaseSearchQuery) ||
            album.artist.toLowerCase().includes(lowerCaseSearchQuery));
      } else {
        searchResults = [...this.albums];
      }

      if (searchCategory) {
        searchResults = searchResults
          .filter(album => album.category === searchCategory);
      }

      this.searchResults = searchResults;
    } else {
      this.resetSearchResults();
    }
  }

  resetSearchResults() {
    this.searchResults = [...this.albums];
  }

  clearSearch() {
    this.resetSearchResults();
  }
}
