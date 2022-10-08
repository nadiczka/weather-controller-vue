<template>
  <div class="login-handler">
    <div class="login-layout-row">
      <div class="login-layout-text">
        <p v-text="`Not logged in`"
           class="text-size"/>
      </div>
      <div class="login-layout-button">
        <b-button v-text="'Login'"
                  class="text-size"
                  variant="warning base-button"
                  v-b-modal.BaseInputModalLogin/>
      </div>
    </div>

    <base-input-modal id="BaseInputModalLogin"
                      ref="BaseInputModalLogin"
                      title-text="Login to Weather Controller"
                      ok-text="Login"
                      @ok="login">

      <template v-slot:inputType>
        <b-form-group id="usernameFieldset"
                      label="Login (AD username)"
                      label-for="loginInput">
          <b-form-input id="loginInput"
                        v-model="loginUsername"/>
        </b-form-group>
        <b-form-group id="passwordFieldset"
                      label="Password (AD password)"
                      label-for="passwordInput">
          <b-form-input id="passwordInput"
                        type="password"
                        v-model="loginPassword"/>
        </b-form-group>

        <b-row align-h="center">
          <b-spinner v-if="loggingInFlag"
                     variant="warning"
                     label="Logging in..."/>
        </b-row>
      </template>

    </base-input-modal>

  </div>
</template>

<script>
  import BaseInputModal from '@/components/base/BaseInputModal'

  export default {
    name: 'LoginHandler',
    data() {
      return {
        loggingInFlag: false,
        loginUsername: '',
        loginPassword: '',
      };
    },
    components: {
      BaseInputModal,
    },
    methods: {
      async login() {
        this.loggingInFlag = true;

        await this.sendLoginQuery();

        this.loginPassword = '';
        this.loggingInFlag = false;
        this.$refs.BaseInputModalLogin.hideModal();
      },
      async sendLoginQuery() {
        const query = {
          username: this.loginUsername,
          password: this.loginPassword,
        };
        return this.$store.dispatch('user/login', query);
      },
    },
  };
</script>

<style scoped>
  p {
    margin: 0;
  }

  .login-layout-row {
    display: flex;
    justify-content: space-between;
  }

  .login-layout-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 1rem;
  }

  .login-layout-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.5rem;
  }

</style>
