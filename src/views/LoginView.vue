<template>
  <div class="auth__container">
    <form @submit.prevent="handleSubmit">
      <div class="auth__login">
        <label for="login-input">Login
          <input
            id="login-input"
            v-model="login"
            type="text"
          /></label>
        <p v-if="errors.login" class="error-message">{{ errors.login }}</p>
      </div>
      <div class="auth__password">
        <label for="password-input">Password
          <input
            id="password-input"
            v-model="password"
            type="password"
          /></label>
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>
      <div class="auth__confirm">
        <button type="submit" class="auth__button">Log In</button>
        <button class="auth__button" @click="register">Register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      login: '',
      password: '',
      errors: {} as { login?: string; password?: string },
    };
  },
  mounted() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  },
  methods: {
    async handleSubmit() {
      this.errors = {};

      if (!this.login) {
        this.errors.login = 'Login is required';
      }

      if (!this.password) {
        this.errors.password = 'Password is required';
      }

      if (Object.keys(this.errors).length === 0) {
        try {
          const result = await this.$store.dispatch('login', {
            email: this.login,
            password: this.password,
          });
          if (!result) {
            this.errors = { login: 'Invalid login or password' };
          } else {
            this.$router.push('/');
          }
        } catch (error) {
          this.errors.login = 'Something went wrong. Please try again.';
        }
      }
    },
    register() {
      this.$router.push('/register');
    },
  },
});
</script>

<style lang="scss" scoped>
.auth__button {
  background-color: #9BC53D;
  padding: 16px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
  color: #ffffff;
  font-size: 16px;
  box-sizing: border-box;

  &:hover {
    color: #FDE74C;
  }
}

.auth__container {
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 250px auto;
  padding: 20px;
  background-color: white;
}

.auth__login,
.auth__password {
  margin-bottom: 16px;
  width: 100%;
}

.auth__login label,
.auth__password label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.auth__login input,
.auth__password input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.auth__confirm {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
}
</style>
