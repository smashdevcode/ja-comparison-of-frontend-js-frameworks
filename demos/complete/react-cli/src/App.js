import React, { Component } from 'react';
import AlbumBox from './components/AlbumBox';
import SearchBar from './components/SearchBar';
import './App.css';

function SearchResults({searchResults}) {
  if (searchResults.length) {
    const albums = searchResults.map(album =>
      <AlbumBox album={album} key={album.id.toString()} />
    );  

    return (
      <div className="columns is-multiline">
        {albums}
      </div>
    );
  } else {
    return (
      <div>Sorry... 
        no results were found that matched your search criteria.</div>
    );
  }
}

class App extends Component {
  appName = 'Music Library';

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      albums: [],
      searchResults: []
    };
  }

  handleSearch = (searchQuery, searchCategory) => {
    if (searchQuery || searchCategory) {
      let searchResults = [];

      if (searchQuery) {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        searchResults = this.state.albums
          .filter(album => 
            album.title.toLowerCase().includes(lowerCaseSearchQuery) || 
            album.artist.toLowerCase().includes(lowerCaseSearchQuery));  
      } else {
        searchResults = [...this.state.albums];
      }

      if (searchCategory) {
        searchResults = searchResults
          .filter(album => album.category === searchCategory);
      }

      this.setState({
        searchResults: searchResults
      });
    } else {
      this.resetSearchResults();
    }
  }

  handleClearSearch = () => {
    this.resetSearchResults();
  }

  resetSearchResults = () => {
    this.setState({
      searchResults: [...this.state.albums]
    });
  }

  componentDidMount() {
    const categoriesRequest = fetch('http://localhost:3000/categories')
      .then(response => response.json());

    const albumsRequest = fetch('http://localhost:3000/albums')
      .then(response => response.json());

    Promise.all([categoriesRequest, albumsRequest])
      .then(data => {
        const categories = data[0];
        const albums = data[1];

        this.setState({
          categories: categories,
          albums: albums,
          searchResults: [...albums]
        });
      });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
    
          <h1 className="title">{this.appName}</h1>
    
          <SearchBar 
            categories={this.state.categories} 
            search={this.handleSearch}
            clearSearch={this.handleClearSearch} />

          <SearchResults searchResults={this.state.searchResults} />
    
        </div>
      </section>
    );
  }
}

export default App;
