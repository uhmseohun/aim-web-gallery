<script>
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: 'Profile',
  components: { ProfileImage },
  async created() {
    this.$emit('startLoad');
    const { userId } = this.$store.state.userProfile;
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
      coverImageURL: null,
    };
  },
  watch: {
    profile: {
      deep: true,
      async handler() {
        const storageURL = `/cover/${this.profile.coverImage}`;
        const imageURL = await this.$storage
          .ref(storageURL)
          .getDownloadURL();
        this.coverImageURL = imageURL;
      },
    },
  },
  computed: {
    computedCoverStyle() {
      const coverImageURL = this.coverImageURL
        ? this.coverImageURL : null;
      return { 'background-image': `url('${coverImageURL}')` };
    },
  },
};
</script>

<template>
  <div class="profile">
    <div
      class="background"
      :style="computedCoverStyle"
    />
    <profile-image
      v-if="profile.profileImage"
      :image="profile.profileImage"
      class="profile-image"
    />
    <h1>{{ profile.name }}</h1>
    <p>{{ profile.introduce }}</p>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background {
  width: 100vw;
  height: 260px;
  background-size: cover;
  margin-top: -20px;
}

.profile-image {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}

h1 {
  margin-top: 10px;
  margin-bottom: 0;
}
p {
  margin-top: 5px;
}
</style>
