<script>
export default {
  name: 'ProfileImage',
  props: {
    image: {
      type: String,
      required: true,
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
