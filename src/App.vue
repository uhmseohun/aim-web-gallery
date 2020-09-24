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
  computed: {
    showNavBar() {
      return !this.$route.fullPath.startsWith('/sign');
    },
    containerStyle() {
      return {
        width: '100%',
        height: '100%',
        padding: this.showNavBar
          ? '20px 60px' : {},
      };
    },
  },
};
</script>

<template>
  <div id="app">
    <loader :active.sync="pending" />
    <nav-bar v-show="showNavBar" />
    <div
      id="container"
      :style="containerStyle"
    >
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
}
</style>

<style>
* {
  box-sizing: border-box;
}
</style>
