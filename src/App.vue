<script>
import NavBar from '@/components/NavBar.vue';
import Loader from 'vue-loading-overlay';

export default {
  name: 'App',
  components: {
    NavBar,
    Loader,
  },
  data() {
    return {
      pending: false,
    };
  },
};
</script>

<template>
  <div id="app">
    <loader :active.sync="pending" />
    <nav-bar />
    <div id="container">
      <router-view
        @startLoad="pending = true"
        @finishLoad="pending = false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#container {
  width: 100%;
  height: 100%;
  padding: 20px 60px;
}
</style>

<style>
* {
  box-sizing: border-box;
}
</style>
