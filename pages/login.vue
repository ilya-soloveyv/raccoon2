<template>
  <b-container>
    <h1>Login</h1>
    <b-form @submit.prevent="login">
      <b-form-group
        id="label-email"
        label="Электронная почта"
        label-for="input-email"
      >
        <the-mask
          ref="phone"
          v-model.number.trim="phone"
          class="form-control"
          :mask="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
        ></the-mask>
      </b-form-group>
      <b-form-group
        id="label-password"
        label="Пароль"
        label-for="input-password"
      >
        <b-input
          id="input-password"
          v-model="password"
          type="password"
          required
        ></b-input>
      </b-form-group>
      <b-alert v-if="error" variant="warning" class="mb-3" show>
        {{ error }}
      </b-alert>
      <b-button type="submit" variant="primary" :disabled="$auth.busy">
        Login
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import consola from 'consola'
import { TheMask } from 'vue-the-mask'
const PhoneValidator = require('phone')

export default {
  components: {
    TheMask
  },
  data() {
    return {
      error: null,
      phone: '9037876602',
      password: 'qwerty'
    }
  },
  methods: {
    login() {
      this.$set(this, 'error', null)
      const phone = PhoneValidator('+7' + this.phone)
      consola.log(phone)
      return this.$auth
        .loginWith('local', {
          data: {
            phone: this.phone,
            password: this.password
          }
        })
        .catch((e) => {
          this.$set(this, 'error', e)
        })
    }
  }
}
</script>
