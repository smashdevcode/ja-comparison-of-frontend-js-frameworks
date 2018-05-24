<template>
  <section class="section" v-cloak>
    <div class="container">

      <h1 class="title" v-text="appName" v-once></h1>

      <search-bar 
        v-bind:categories="categories" 
        v-on:search="search"
        v-on:clear-search="clearSearch" />

      <div class="columns is-multiline" v-if="searchResults.length">
        <album-box 
          v-for="album in searchResults" 
          v-bind:album="album" 
          v-bind:key="album.id" />
      </div>

      <div v-else>
        <div>Sorry... no results were found that matched your search criteria.</div>
      </div>
    
    </div>
  </section>
</template>

<script>
import AlbumBox from './components/AlbumBox.vue'
import SearchBar from './components/SearchBar.vue'

export default {
  name: 'app',
  data: function() {
    return {
      appName: 'Music Library',
      categories: [],
      albums: [],
      searchResults: []
    };
  },
  components: {
    AlbumBox,
    SearchBar
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
}
</script>

<style>
</style>
