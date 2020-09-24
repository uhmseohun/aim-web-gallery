<script>
import WhiteLogo from '@/assets/whiteLogo.png';

export default {
  name: 'SignUp',
  data() {
    return {
      WhiteLogo,
      account: {
        name: null,
        email: null,
        password: null,
        repassword: null,
      },
    };
  },
  methods: {
    async createAccount() {
      try {
        if (this.account.password !== this.account.repassword) {
          await this.$swal(
            '에러!',
            '두 비밀번호가 일치한지 확인해 주세요.',
            'error',
          );
          return;
        }
        await this.$store.dispatch('signUpAccount', this.account);
        this.$swal(
          '성공!',
          '회원가입을 성공했어요',
          'success',
        );
        this.$router.push('/');
      } catch (error) {
        await this.$swal(
          '에러!',
          '서버 오류가 발생했어요.',
          'error',
        );
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="form">
      <div class="form__field">
        <span class="form__label">이메일</span>
        <input
          v-model="account.email"
          class="form__input"
          placeholder="이메일을 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">이름</span>
        <input
          v-model="account.name"
          class="form__input"
          placeholder="실명을 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">비밀번호</span>
        <input
          type="password"
          v-model="account.password"
          class="form__input"
          placeholder="비밀번호를 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <div class="form__field">
        <span class="form__label">비밀번호 확인</span>
        <input
          type="password"
          v-model="account.repassword"
          class="form__input"
          placeholder="비밀번호를 다시 작성해 주세요."
          style="width: 100%"
        />
      </div>

      <button
        @click="createAccount"
        class="form__button"
      >
        가입하기
      </button>
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
  background-color: #ffffff;
  margin-top: 30px;

  &__label {
    width: 130px;
  }

  &__field {
    display: flex;
    align-items: center;
  }

  &__button {
    height: 2rem;
  }

  &__input {
    border: 1px solid #7f7f7f;
    padding: 10px;
    margin-bottom: 9px;
  }
}
</style>
