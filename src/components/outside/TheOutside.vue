<template>
  <b-tabs v-model="selectedTab"
          :vertical="true"
          card
          class="home-tabs"
          pills>

    <b-tab active title="Pressure">
      <the-pressure-tab/>
    </b-tab>

    <b-tab title="Temperature">
      <the-temperature-tab/>
    </b-tab>

    <b-tab title="Water level">
      <the-water-level-tab/>
    </b-tab>

  </b-tabs>
</template>

<script>
  import ThePressureTab from '@/components/ThePressureTab';
  import TheTemperatureTab from '@/components/TheTemperatureTab';
  import TheWaterLevelTab from '@/components/outside/TheWaterLevelTab';

  export default {
    name: 'TheOutside',
    components: {
      ThePressureTab,
      TheTemperatureTab,
      TheWaterLevelTab,
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
