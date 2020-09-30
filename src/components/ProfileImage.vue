<script>
import { mapState } from 'vuex';

export default {
  name: 'ProfileImage',
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['userProfile']),
  },
  methods: {
    pushToProfile() {
      this.$router.push(
        `/profile/${this.userProfile.userId}`,
      );
    },
  },
};
</script>

<template>
  <!-- <div
    class="image"
    :style="{
      'background-image': image
    }"
  /> -->
  <span @click="pushToProfile">
    {{ $store.state.userProfile.name }}
  </span>
</template>

<style lang="scss" scoped>
.image {
  border-radius: 100%;
  background-color: rgb(200, 200, 200);
  width: 2rem;
}
</style>
