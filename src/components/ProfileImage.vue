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
    computedStyle() {
      return {
        'background-image': `url('${this.imageURL}')`,
      };
    },
  },
  data() {
    return {
      imageURL: null,
    };
  },
  async created() {
    this.$emit('startLoad');
    const { image } = this;
    const storageURL = `/profile/${image}`;
    const imageURL = await this.$storage
      .ref(storageURL)
      .getDownloadURL();
    this.imageURL = imageURL;
    this.$emit('finishLoad');
  },
  watch: {
    image: {
      deep: true,
      async handler() {
        const storageURL = `/profile/${this.image}`;
        const imageURL = await this.$storage
          .ref(storageURL)
          .getDownloadURL();
        this.imageURL = imageURL;
      },
    },
  },
};
</script>

<template>
  <div
    class="image"
    :style="computedStyle"
  />
</template>

<style lang="scss" scoped>
.image {
  border-radius: 100%;
  background-color: rgb(200, 200, 200);
  width: 2rem;
  background-size: cover;
}
</style>
