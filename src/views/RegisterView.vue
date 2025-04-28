<template>
  <div class="auth__container">
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <div class="auth__email">
        <label for="email-input">Email
          <input
            id="email-input"
            v-model="email"
            type="text"
          /></label>
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div class="auth__password">
        <label for="password-input">Password
          <input
            id="password-input"
            v-model="password"
            type="password"
          /></label>
        <div class="password-strength ">
          <div
            v-for="(bar, index) in 4"
            :key="index"
            :class="barClass(index)"
            class="strength-bar"
          ></div>
        </div>
        <label for="password-input">Complete password
          <input
            id="password-input2"
            v-model="password2"
            type="password"
          /></label>
        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
      </div>
      <div class="auth__confirm">
        <button type="submit" class="auth__button">Register</button>
      </div>
    </form>
    <p>Already have an account?
      <router-link to="/login">Sign up</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      errors: {} as { email?: string; password?: string },
    };
  },
  mounted() {
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'none';
  },
  computed: {
    strength(): number {
      let strength = 0;
      if (this.password.length >= 6) strength += 1;
      if (this.password.length >= 8) strength += 1;
      if (/[A-Z]/.test(this.password)) strength += 1;
      if (/[0-9]/.test(this.password) || /[^A-Za-z0-9]/.test(this.password)) strength += 1;
      return strength;
    },
  },
  methods: {
    async handleSubmit() {
      this.errors = {};

      if (!this.email) {
        this.errors.email = 'Email is required';
      } else {
        this.validateEmail();
      }

      if (!this.password) {
        this.errors.password = 'Password is required';
      }

      if (this.password !== this.password2) {
        this.errors.password = 'Password must be identical';
      }

      if (Object.keys(this.errors).length === 0) {
        try {
          const result = await this.$store.dispatch('register', {
            email: this.email,
            password: this.password,
          });
          if (!result) {
            this.errors = { email: 'User already exists' };
          } else {
            this.$store.state.notyf.success('User was created');
            this.$router.push('/login');
          }
        } catch (error) {
          this.errors.email = 'Something went wrong. Please try again.';
        }
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.errors.email = 'Invalid email address';
      }
    },
    barClass(index: number) {
      if (index < this.strength) {
        return `bar-${this.strength}`;
      }
      return '';
    },
  },
});
</script>

<style lang="scss" scoped>
.auth__button {
  width: 100%;
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

.auth__email,
.auth__password {
  margin-bottom: 16px;
  width: 100%;
}

.auth__email label,
.auth__password label {
  display: block;
  font-size: 14px;
  margin-bottom: 4px;
}

.auth__email input,
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

.password-strength {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.strength-bar {
  height: 10px;
  background-color: #ddd;
  border-radius: 2px;
  transition: background-color 0.3s;
}

.bar-1 {
  background-color: red;
}

.bar-2 {
  background-color: orange;
}

.bar-3 {
  background-color: yellowgreen;
}

.bar-4 {
  background-color: green;
}
</style>
