
const app = new Vue({
  el: '#app',
  data: {
    appName: 'Music Library',
    categories: [],
    albums: [],
    showSearchCriteria: false,
    searchQuery: '',
    searchCategory: '',
    searchResults: []
  },
  methods: {
    search() {
      const searchQuery = this.searchQuery;
      const searchCategory = this.searchCategory;

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
    },
    resetSearchResults() {
      this.searchResults = [...this.albums];
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchCategory = '';
      this.resetSearchResults();
    }
  },
  created() {
    const categoriesRequest = fetch('http://localhost:3000/categories')
      .then(response => response.json());

    const albumsRequest = fetch('http://localhost:3000/albums')
      .then(response => response.json());

    Promise.all([categoriesRequest, albumsRequest])
      .then(data => {
        this.categories = data[0];
        this.albums = data[1];
        this.resetSearchResults();
      });
  }
});
