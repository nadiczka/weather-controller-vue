<template>
  <base-tab-container>
    <template v-slot:tab-body>
      <b-row>
        <b-col>
          <base-paragraphs-with-backgrounds v-model="signalsData.series"/>
        </b-col>
      </b-row>
      <b-row class="mt-4">
        <b-col>
          <updating-chart :signals-data="signalsData"
                          :attribute-name="attributeName"
                          :chart-height="chartHeight"/>
        </b-col>
      </b-row>
    </template>
  </base-tab-container>
</template>

<script>
  import BaseTabContainer from '@/components/base/BaseTabContainer';
  import BaseParagraphsWithBackgrounds from '@/components/base/BaseParagraphsWithBackgrounds';
  import UpdatingChart from '@/components/charts/UpdatingChart';
  import {addPointsToStoreAttribute, constructSignalsData, getStoreValue} from "@/helpers";
  import {mapState} from "vuex";

  export default {
    name: 'TheTemperatureTab',
    components: {
      BaseTabContainer,
      BaseParagraphsWithBackgrounds,
      UpdatingChart,
    },
    data() {
      return {
        labels: ['TemperatureSwimmingPool', 'TemperatureTerrace', 'TemperatureBalcony'],
        attributeName: 'temperature',
        prepend: '',
        append: '',
      };
    },
    computed: {
      ...mapState(['controlArea']),
      chartHeight() {
        return`${window.innerHeight*0.4}px`
      },
      temperature() {
        return getStoreValue(this.controlArea,this.attributeName);
      },
      signalsData() {
        return constructSignalsData(this.temperature, this.labels, this.prepend, this.append);
      },
    },
    methods: {
      initializeIntervalPointsAddition() {
        this.interval = setInterval(() => {
          addPointsToStoreAttribute(this.controlArea, this.attributeName, this.labels);
        }, 2000);
      },
    },
    mounted() {
      this.initializeIntervalPointsAddition();
      this.$root.$on('reload', () => this.initializeIntervalPointsAddition());
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
  };
</script>

<style scoped>

</style>

