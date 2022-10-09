<template>
  <b-tabs v-model="selectedTab"
          :vertical="true"
          card
          class="home-tabs"
          pills>

    <b-tab active title="Pressure">
      <the-pressure-tab/>
    </b-tab>
  </b-tabs>
</template>

<script>
  import ThePressureTab from '@/components/ThePressureTab';

  export default {
    name: 'TheOutside',
    components: {
      ThePressureTab,
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
