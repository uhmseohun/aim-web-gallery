<script>
import ProfileImage from '@/components/ProfileImage.vue';
import { v4 as uuid } from 'uuid';

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
    async getProfileImage() {
      const fileInput = this.$refs.profileImage;
      await fileInput.click();
    },
    async getCoverImage() {
      const fileInput = this.$refs.coverImage;
      await fileInput.click();
    },
    async uploadProfileImage() {
      this.$emit('startLoad');
      const fileId = uuid();
      const file = this.$refs.profileImage.files[0];
      await this.$storage.ref(`/profile/${fileId}`).put(file);
      this.profile.profileImage = fileId;
      await this.saveProfile();
      this.$emit('finishLoad');
    },
    async uploadCoverImage() {
      this.$emit('startLoad');
      const fileId = uuid();
      const file = this.$refs.coverImage.files[0];
      await this.$storage.ref(`/cover/${fileId}`).put(file);
      this.profile.coverImage = fileId;
      await this.saveProfile();
      this.$emit('finishLoad');
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
        <span class="form__label">이메일</span>
        <input
          v-model="profile.email"
          class="form__input"
          style="width: 100%"
          disabled
        />
      </div>

      <div class="form__field">
        <span class="form__label">닉네임</span>
        <input
          v-model="profile.nickname"
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
        <textarea
          v-model="profile.introduce"
          class="form__input"
          placeholder="한줄소개를 작성해 주세요."
          style="width: 100%; resize: none;"
        />
      </div>

      <div class="form__field">
        <span class="form__label">Insta</span>
        <input
          v-model="profile.instagram"
          class="form__input"
          placeholder="인스타그램 URL을 작성해 주세요. (선택)"
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">FB</span>
        <input
          v-model="profile.facebook"
          class="form__input"
          placeholder="페이스북 URL을 작성해 주세요. (선택)"
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
    </div>
    <input type="file" style="display: none;" ref="profileImage" @change="uploadProfileImage">
    <input type="file" style="display: none;" ref="coverImage" @change="uploadCoverImage">
    <div style="display: flex;" id="menu-wrapper">
      <button class="save" @click="saveProfile">저장</button>
      <button class="save" @click="getProfileImage">프로필 사진 수정</button>
      <button class="save" @click="getCoverImage">커버 사진 수정</button>
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
  height: 260px;
  background-position: center;
  background-size: cover;
  margin-top: -20px;
}

.form {
  width: 800px;
  border-radius: 15px;
  padding: 2rem;
  background-color: #FFFFFF;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 15px;

  &__button {
    margin-bottom: 10px;
  }

  &__field {
    display: flex;
  }

  &__label {
    background-color: #0F4BC2;
    border-radius: 20px;
    color: white;
    margin-bottom: 10px;
    padding: 1px 8px;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  &__input {
    padding: 10px;
    margin-bottom: 9px;
    background-color: #EBEBEB;
    border-radius: 15px;
    border: 0;
    outline: none;
    padding: 5px 20px;
  }
}

.save {
  width: 150px;
  height: 40px;
  background-color: #0F4BC2;
  color: white;
  border: 0;
  border-radius: 20px;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
}

#menu-wrapper button {
  margin: 0 10px;
}

.profile-image {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}

h1 {
  margin: 10px 0;
}
</style>
