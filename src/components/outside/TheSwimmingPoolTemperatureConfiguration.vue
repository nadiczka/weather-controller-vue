<template>
  <base-tab-container class="configuration-tab">
    <template v-slot:tab-body>
      <configuration-form/>

      <b-row>
        <b-col>
          <configuration-chart/>
        </b-col>
      </b-row>
    </template>
  </base-tab-container>
</template>

<script>
  import BaseTabContainer from "@/components/base/BaseTabContainer";
  import BaseParagraphsWithBackgrounds from "@/components/base/BaseParagraphsWithBackgrounds";
  import ConfigurationChart from "@/components/charts/ConfigurationChart";
  import ConfigurationForm from "@/components/configurationTab/ConfigurationForm";

  export default {
    name: 'TheSwimmingPoolTemperatureConfiguration',
    components: {
      BaseTabContainer,
      BaseParagraphsWithBackgrounds,
      ConfigurationChart,
      ConfigurationForm,
    },
  };
</script>

<style scoped>
  .configuration-tab {
    padding: 2rem;
    background-color: rgba(78, 84, 50, 0.3);
  }
</style>
