<script>
export default {
  name: 'Profile',
  async created() {
    this.$emit('startLoad');
    const { userId } = this.$route.params;
    const profile = (await this.$db
      .collection('user')
      .doc(userId)
      .get())
      .data();
    this.profile = profile;
    this.$emit('finishLoad');
  },
  data() {
    return {
      profile: {},
    };
  },
};
</script>

<template>
  <div class="home">
    {{ profile }}
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin-top: 10px;
  margin-right: 30px;
}

.card-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
