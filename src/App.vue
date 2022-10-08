<template>
  <div id="app">
    <the-header class="border-underline"/>
    <the-access-status class="border-underline"/>
    <router-view class="content"/>
    <notifications position="top right"/>
  </div>
</template>

<script>
  import TheHeader from '@/components/TheHeader';
  import TheAccessStatus from '@/components/access/TheAccessStatus';

  export default {
    name: 'App',
    components: {
      TheHeader,
      TheAccessStatus,
    },
    watch: {
      '$route.path': {
        handler() {
          const routeParts = this.$route.path.split('/');
          const controlArea = routeParts[1];
          this.$store.commit('setControlArea', controlArea);
        },
      },
    },
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
    background-image: url("./assets/clouds.jpg");
    background-color: $background-color;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .border-underline {
    border-bottom: 1px solid $text-color;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }

  .content {
    margin-right: 1rem;
    margin-left: 1rem;
    flex-grow: 1;
  }
</style>
