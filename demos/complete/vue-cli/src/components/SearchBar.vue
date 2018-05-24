<template>
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
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    categories: {
      type: Array,
      required: true
    },
    showSearchCriteria: {
      type: Boolean,
      default: false
    }
  },  
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
  }
}
</script>

<style scoped>
</style>
