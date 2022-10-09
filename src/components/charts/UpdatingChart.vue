<template>
  <base-updating-chart :attribute-name="attributeName"
                       :attributes-labels="signalsLabels"
                       :attributes-part-names="attributesNames"
                       :attributes-values="signalsValues"
                       :chart-height="chartHeight"
                       :control-area="controlArea"
                       :number-of-signals="numberOfSignals"/>
</template>

<script>
  import BaseUpdatingChart from '@/components/charts/BaseUpdatingChart';
  import { mapState } from "vuex";

  export default {
    name: 'UpdatingChart',
    props: {
      signalsData: {
        type: Object,
        default: () => ({
          series: [],
          labelPrepend: '',
          labelAppend: '',
        }),
      },
      attributeName: {
        type: String,
        require: true,
      },
      chartHeight: {
        type: String,
        default: null,
      },
    },
    components: {
      BaseUpdatingChart,
    },
    computed: {
      ...mapState(['controlArea']),
      attributesNames() {
        return this.signalsData.series.map((el) => {
          return this.signalsData.labelPrepend + el.label + this.signalsData.labelAppend;
        })
      },
      numberOfSignals() {
        return this.signalsData.series.length;
      },
      signalsValues() {
        return this.signalsData.series.map((el) => {
          return el.data;
        })
      },
      signalsLabels() {
        return this.signalsData.series.map((el) => {
          return el.label;
        })
      },
    },
  };
</script>

<style scoped>

</style>
