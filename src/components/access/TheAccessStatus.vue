<template>
  <div class="login-status">

    <div v-if="user.name !== ''">
      <LogoutHandler/>
    </div>

    <div v-else>
      <LoginHandler/>
    </div>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import LoginHandler from '@/components/access/LoginHandler';
  import LogoutHandler from '@/components/access/LogoutHandler';

  export default {
    name: 'TheAccessStatus',
    components: { LogoutHandler, LoginHandler },
    computed: {
      ...mapState('user', ['user']),
    },
  };
</script>

<style scoped lang="scss">
  .login-status {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
