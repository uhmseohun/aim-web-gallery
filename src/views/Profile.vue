<script>
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: 'Profile',
  components: { ProfileImage },
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
  <div class="profile">
    <div class="background" />
    <profile-image />
    <h1 style="margin-bottom: 0;">{{ profile.name }}</h1>
    <p>{{ profile.introduce }}</p>
    <p>
      <span style="color: #0F4BC2; font-weight: bold;">팔로워</span>
      100
      <span style="color: #0F4BC2; font-weight: bold;">팔로잉</span>
      100
    </p>
    <div style="width: 100vw; height: 1px; background-color: #666461;" />
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
  height: 250px;
  background-image: url('https://ssl.pstatic.net/tveta/libs/1296/1296980/43ba3c66bd27541be66c_20200923151045360.jpg');
  background-size: cover;
}
</style>
