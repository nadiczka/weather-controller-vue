<template>
  <div id="app">
    <the-header class="border-underline"/>
    <router-view class="content"/>
    <notifications position="top right"/>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader';
  export default {
    name: 'App',
    components: {
      TheHeader,
    },
    watch: {
      '$route.path': {
        handler() {
          const routeParts = this.$route.path.split('/');
          const instance = routeParts[1];
          this.$store.commit('setInstance', instance);
        },
      },
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $text-color;
    background-image: url("./assets/clouds.jpg");
    margin: 0;
    background-color: $background-color;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  html {
    background-color: $background-color;
    height: 100vh;
    width: 97vw;
    margin: 0 auto;
    padding: 0;
    overflow-x: hidden;
  }

  .border-underline {
    border-bottom: 1px solid $text-color;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }

  .content {
    flex-grow: 1;
  }

</style>
