<template>
  <b-tabs v-model="selectedTab"
          :vertical="true"
          card
          class="home-tabs"
          pills>

  </b-tabs>
</template>

<script>
  export default {
    name: 'TheOutside',
    components: {

    },
    data() {
      return {
        selectedTab: 0,
      };
    },
    watch: {
      selectedTab() {
        this.$store.commit('outside/setSelectedTab', this.selectedTab);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '@/assets/styles/semiHomeStyling';
</style>
