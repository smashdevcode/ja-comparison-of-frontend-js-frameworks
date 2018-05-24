<template>
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
</template>

<script>
export default {
  name: 'AlbumBox',
  props: {
    album: {
      type: Object,
      required: true
    },
  },
  computed: {
    imageUrl() {
      return require(`../assets/${this.album.id}.png`);
    }
  },
}
</script>

<style scoped>
</style>
