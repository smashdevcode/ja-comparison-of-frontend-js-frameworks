
Vue.component('album-box', {
  data: function() {
    return {};
  },
  props: ['album'],
  computed: {
    imageUrl() {
      return `img/${this.album.id}.png`;
    }
  },
  template: `
    <div class="column is-half">
      <div class="box">
        <div class="columns">
          <div class="column">
            <figure class="image is-square">
              <img v-bind:src="imageUrl" v-bind:alt="album.title" />
            </figure>
          </div>
          <div class="column">
            <h2 class="title">{{ album.title }}</h2>
            <h3 class="subtitle">{{ album.artist }}</h3>
            <div>
              Category: {{ album.category }}
            </div>
          </div>      
        </div>      
      </div>
    </div>
  `
});

Vue.component('search-bar', {
  props: ['categories', 'showSearchCriteria'],  
  data: function() {
    return {
      searchQuery: '',
      searchCategory: ''
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery, this.searchCategory);
    },
    clearSearch() {
      this.searchQuery = '';
      this.searchCategory = '';      
      this.$emit('clear-search');
    }
  },
  template: `
    <div>
      <div class="columns">
        <div class="column">
          <input type="text" v-model.trim="searchQuery" 
            v-on:keyup.enter="search" class="input is-medium" placeholder="Enter search query..." />
        </div>
        <div class="column is-narrow">
          <div class="select is-medium">
            <select v-model="searchCategory">
              <option value="">Select a category...</option>
              <option v-for="category in categories" 
                v-bind:value="category" v-bind:key="category">{{ category }}</option>
            </select>
          </div>
        </div>
        <div class="column is-narrow">
          <button v-on:click="search" class="button is-primary is-medium">Search</button>&nbsp;
          <button v-on:click="clearSearch" class="button is-warning is-medium">Clear</button>    
        </div>
      </div>

      <div v-show="showSearchCriteria && (searchQuery || searchCategory)" class="notification is-info">
        <span v-show="searchQuery">Search Query: {{ searchQuery }}</span><span v-show="searchQuery && searchCategory">, </span><span v-show="searchCategory">Search Category: {{ searchCategory }}</span>
      </div>
    </div>
  `
});

const app = new Vue({
  el: '#app',
  data: {
    appName: 'Music Library',
    categories: [],
    albums: [],
    searchResults: []
  },
  methods: {
    search(searchQuery, searchCategory) {
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
