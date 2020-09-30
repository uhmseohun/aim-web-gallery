<script>
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: 'EditProfile',
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
    };
  },
  methods: {
    async saveProfile() {
      this.$emit('startLoad');
      const { userId } = this.$store.state.userProfile;
      const userProfile = {
        ...this.profile,
        userId,
      };
      this.$store.commit('setUserProfile', userProfile);
      await this.$db
        .collection('user')
        .doc(userId)
        .set(userProfile);
      this.$emit('finishLoad');
      await this.$swal(
        '성공!',
        '프로필을 성공적으로 수정했어요.',
        'success',
      );
    },
  },
};
</script>

<template>
  <div class="profile">
    <div class="background" />
    <profile-image />
    <h1>{{ profile.name }}</h1>
    <div class="form">
      <div class="form__field">
        <span class="form__label">이름</span>
        <input
          v-model="profile.name"
          class="form__input"
          placeholder="실명을 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">닉네임</span>
        <input
          v-model="profile.name"
          class="form__input"
          placeholder="닉네임을 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">전화번호</span>
        <input
          v-model="profile.phone"
          class="form__input"
          placeholder="전화번호를 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">한줄소개</span>
        <input
          v-model="profile.introduce"
          class="form__input"
          placeholder="한줄소개를 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">카테고리</span>
        <input
          v-model="profile.category"
          class="form__input"
          placeholder="카테고리를 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <button
        @click="saveProfile"
        class="form__button"
      >
        저장하기
      </button>
    </div>
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

.form {
  width: 450px;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  margin-top: 30px;

  &__button {
    margin-bottom: 10px;
  }

  &__input {
    border: 1px solid #7F7F7F;
    padding: 10px;
    margin-bottom: 9px;
  }
}
</style>
