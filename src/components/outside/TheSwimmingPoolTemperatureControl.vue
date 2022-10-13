<template>
  <base-tab-container title="Inside">
    <template v-slot:tab-body>
      <config-form main-unit="A"
                   :number-of-output-channels="2"/>

      <hr style="border-top-color: gray;">

      <b-row>
        <b-col>
<!--          <config-chart />-->
        </b-col>
      </b-row>
    </template>
  </base-tab-container>
</template>

<script>
  import BaseTabContainer from "@/components/base/BaseTabContainer";
  import BaseParagraphsWithBackgrounds from "@/components/base/BaseParagraphsWithBackgrounds";
  import LeftUpdatingChart from "@/components/charts/UpdatingChart";
  import ConfigChart from "@/components/charts/ControlChart";
  import ConfigForm from "@/components/controlTab/ControlForm";

  export default {
    name: 'TheSwimmingPoolTemperatureControl',
    components: {
      BaseTabContainer,
      BaseParagraphsWithBackgrounds,
      LeftUpdatingChart,
      ConfigChart,
      ConfigForm,
    },
  };
</script>

<style scoped>

</style>
