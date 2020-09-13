<script>
export default {
  name: 'ProfileImage',
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  computed: {
    signState() {
      return this.$store.state.signedIn
        ? 'SIGN_IN' : 'SIGN_OUT';
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
  <span>
    STATE: {{ signState }}
  </span>
</template>

<style lang="scss" scoped>
.image {
  border-radius: 100%;
  background-color: rgb(200, 200, 200);
  width: 2rem;
}
</style>
