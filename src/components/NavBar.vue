<script>
import AButton from '@/components/AButton.vue';
import ProfileImage from '@/components/ProfileImage.vue';
import Logo from '@/assets/logo.png';
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  components: {
    AButton,
    ProfileImage,
  },
  data() {
    return {
      Logo,
    };
  },
  methods: {
    pushTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  computed: {
    ...mapState(['signedIn', 'userProfile']),
  },
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar__left">
      <img class="navbar__left__logo" :src="Logo">
    </div>

    <div class="navbar__center">
      <span
        class="navbar__center__item"
        @click="pushTo('ProjectList')"
      >
        펀딩
      </span>

      <span
        class="navbar__center__item"
        @click="pushTo('Feed')"
      >
        피드
      </span>

      <span
        class="navbar__center__item"
        @click="pushTo('Gallery')"
      >
        갤러리
      </span>

      <span
        class="navbar__center__item"
        @click="pushTo('Saved')"
      >
        저장된 작품
      </span>
    </div>

    <div class="navbar__right">
      <a-button
        @click="pushTo('UploadProject')"
        class="navbar__right__button"
      >
        프로젝트 업로드
      </a-button>
      <a-button
        @click="pushTo('UploadProduct')"
        class="navbar__right__button"
      >
        작품 업로드
      </a-button>
      <a-button
        v-if="!signedIn"
        @click="pushTo('SignIn')"
      >
        로그인
      </a-button>
      <div v-else @click="pushTo('EditProfile')">
        <profile-image
          class="navbar__right__profile"
          :image="userProfile.profileImage"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: rgb(17, 17, 17);
  box-sizing: border-box;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 4rem;
  color: white;

  &__left {
    &__logo {
      height: 1.5em;
    }
  }

  &__center {
    position: absolute;
    top: 41px;
    margin-left: 40vw;
    margin-right: 40vw;

    &__item {
      cursor: pointer;

      &:not(:first-of-type) {
        margin-left: 15px;
        padding-left: 15px;
        border-left: 1px solid rgb(255, 255, 255);
      }
    }
  }

  &__right {
    display: flex;
    margin-left: auto;

    &__button,
    &__profile {
      margin-right: 5px;
    }

    &__profile {
      height: 40px;
      width: 40px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
