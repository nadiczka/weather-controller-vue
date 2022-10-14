<template>
  <div>
    <b-row>
      <b-col style="display: flex">
        <h3 class="left-base-color-text mt-2">Ramp simulation</h3>
      </b-col>
    </b-row>
    <b-row class="border-div">
      <b-col>
        <base-static-chart :chart-data="finalChartData"
                           class="mt-2"/>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import BaseStaticChart from '@/components/charts/BaseStaticChart';
  import { mapState } from 'vuex';

  export default {
    name: 'ControlChart',
    data() {
      return {
        refresh: false,
      };
    },
    components: {
      BaseStaticChart,
    },
    computed: {
      ...mapState(['controlArea']),
      chartData() {
        if (this.controlArea) {
          return this.$store.state[this.controlArea].configChartData;
        }
        return {};
      },
      segmentsData() {
        return this.chartData.segmentsConfig || {};
      },
      mainUnit() {
        return this.chartData.mainUnit || '';
      },
      timeUnit() {
        return this.chartData.timeUnit || '';
      },
      isValidate() {
        let isValidate = true;
        Object.values(this.segmentsData).forEach((singleChartData) => {
          if (!singleChartData) {
            isValidate = false;
          }
          Object.values(singleChartData).forEach((segment) => {
            Object.values(segment).forEach((field) => {
              if (field === '') {
                isValidate = false;
              }
            });
          });
        });
        return isValidate;
      },
      finalChartData() {
        let finalChartDataObject = {};
        if (this.isValidate) {
          Object.entries(this.segmentsData).forEach(([name, chartDataObject]) => {
            finalChartDataObject[name] = this.createSingleChartDataFromStartEndValues(chartDataObject);
          });
        } else {
          this.$notify({ type: 'error', title: 'Some segments fields are empty' });
        }
        return finalChartDataObject;
      },
    },
    methods: {
      createSingleChartDataFromStartEndValues(chartDataObject) {
        let XYVal = [];
        let currentTime = 0;
        Object.values(chartDataObject).forEach((val) => {
          if (XYVal.length === 0) {
            XYVal.push([0, val.startValue]);
          }
          const upperUnit = this.timeUnit[0].toUpperCase() + this.timeUnit.substring(1);
          const segmentTimeText = `segmentTime${upperUnit}`;
          currentTime = currentTime + Number(val[segmentTimeText]);
          XYVal.push([currentTime, val.stopValue]);
        });
        return XYVal;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .left-base-color-text {
    color: $base-button-color;
    justify-content: flex-start;
  }

  .border-div {
    border: 4px solid $base-button-color;
    padding-top: 0.5rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
</style>
