<template>
  <base-tab-container class="control-tab">
    <template v-slot:tab-body>
      <control-form/>

      <b-row>
        <b-col>
          <control-chart/>
        </b-col>
      </b-row>
    </template>
  </base-tab-container>
</template>

<script>
  import BaseTabContainer from "@/components/base/BaseTabContainer";
  import BaseParagraphsWithBackgrounds from "@/components/base/BaseParagraphsWithBackgrounds";
  import ControlChart from "@/components/charts/ControlChart";
  import ControlForm from "@/components/controlTab/ControlForm";

  export default {
    name: 'TheSwimmingPoolTemperatureControl',
    components: {
      BaseTabContainer,
      BaseParagraphsWithBackgrounds,
      ControlChart,
      ControlForm,
    },
  };
</script>

<style scoped>
  .control-tab {
    padding: 2rem;
    background-color: rgba(78, 84, 50, 0.3);
  }
</style>
