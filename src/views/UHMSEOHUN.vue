<script lang="ts">
import Vue from 'vue';
import photos from './feed.json';

export default Vue.extend({
  name: 'App',
  created() {
    this.photos = this.photos.filter((photo) => {
      if (photo.id === 'a5944422-ab0e-4db5-856c-4a60901b4c92') return true;
      if (photo.id === 'a7016fdf-f333-4bf8-9ff1-5d17739c7488') return true;
      return false;
    });
    this.photos.forEach((photo) => {
      const image = new Image();
      image.src = photo.thumbnail;
    });
    setInterval(() => {
      this.current += 1;
      if (this.current === this.photos.length) this.current = 0;
    }, 2500);
    document.body.style.marginTop = '25px';
  },
  data() {
    return {
      photos,
      current: 0,
    };
  },
});
</script>

<template>
<div>
  <div class="container">
    <img :src="photos[current].thumbnail">
    <div style="width: 300px;">
      <h2>{{ photos[current].title }}</h2>
      <h3 style="font-weight: normal; word-wrap: break-all;">
        {{ photos[current].content[0].value }}
      </h3>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 96.5vh;
}

img {
  width: 600px;
}
</style>
