<script>
import WhiteLogo from '@/assets/whiteLogo.png';
import AButton from '@/components/AButton.vue';

export default {
  name: 'SignIn',
  components: { AButton },
  data() {
    return {
      WhiteLogo,
      account: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    async signInWithAccount() {
      try {
        await this.$store.dispatch('signInWithAccount', this.account);
      } catch (error) {
        await this.$swal('에러!', '이메일이나 비밀번호를 확인해 주세요.', 'error');
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <img class="logo" :src="WhiteLogo">
    <div class="form">
      <a-button>
        회원가입
      </a-button>
      <div style="display: flex; align-items: center;">
        <div style="height: 1px; flex: 1; background-color: #BFBFBF;" />
        <span style="color: #BFBFBF; margin: 0 20px;">또는</span>
        <div style="height: 1px; flex: 1; background-color: #BFBFBF;" />
      </div>

      <input
        v-model="account.email"
        class="form__input"
        placeholder="E-MAIL"
      >
      <input
        v-model="account.password"
        type="password"
        class="form__input"
        placeholder="PASSWORD"
      >
      <a-button
        @click="signInWithAccount"
        class="form__button"
        color="#555555"
      >
        로그인
      </a-button>
      <div style="display: flex; align-items: center; margin-bottom: 10px;">
        <div style="height: 1px; flex: 1; background-color: #BFBFBF;" />
      </div>

      <a-button class="form__button" color="#DA5A53">
        Google로 로그인
      </a-button>
      <a-button class="form__button" color="#272B30">
        Facebook으로 로그인
      </a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.container::before {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  background-image: url(https://i.ibb.co/8b3g3Jw/39-DD1-EF5-5-BAD-4-CEE-B586-79-A90675328-D.jpg);
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
  content: "";
}

.logo {
  width: 450px;
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
