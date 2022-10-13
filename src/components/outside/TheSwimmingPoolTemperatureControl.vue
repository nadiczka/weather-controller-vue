<template>
  <base-tab-container title="Inside">
    <template v-slot:tab-body>
      <control-form main-unit="A"
                   :number-of-output-channels="2"/>

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

</style>
