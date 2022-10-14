<template>
  <div class="highchart"/>
</template>

<script>
  import * as Highcharts from 'highcharts/highstock';
  import {colors, jsonCopy} from "@/helpers";

  export default {
    name: 'BaseStaticChart',
    data() {
      return {
        chart: undefined,
        timeUnit: 'min',
        mainColor: 'rgb(1, 133, 190)',
      };
    },
    props: {
      chartData: {
        type: Object,
        default: () => ({}),
      },
      mainUnit: {
        type: String,
        default: '\u00B0C',
      },
    },
    methods: {
      createChart() {
        const getChartData = () => { return this.chartData };
        this.chart = Highcharts.stockChart(this.$el, {
          chart: {
            backgroundColor: 'white',
          },
          rangeSelector: {
            enabled: false
          },
          credits: {
            enabled: false,
          },
          title: {
            text: ''
          },
          navigator: {
            enabled: false,
          },
          exporting: {
            enabled: false
          },
          series: (function () {
            let series = [];
            const chartData = getChartData();
            Object.keys(chartData).forEach((name, index) => {
              const emptySeries = {
                name: name,
                connectNulls: true,
                shadow: false,
                color: colors[index],
              };
              series.push(jsonCopy(emptySeries));
            })
            return series;
          }()),
          legend: {
            enabled: true,
            align: 'right',
            backgroundColor: 'none',
            borderColor: this.mainColor,
            borderWidth: 1,
            verticalAlign: 'top',
            x: 0,
            y: -45,
            shadow: true,
            itemStyle: {
              color: 'white',
              fontSize: '15px',
              fontWeight: 'normal',
            },
            itemHiddenStyle: {
              color: this.mainColor,
            },
            itemHoverStyle: {
              color: this.mainColor,
            },
          },
          tooltip: {
            valueDecimals: 2,
            headerFormat: '{point.x:.2f}',
            pointFormat: '{point.y}',
          },
          responsive: {
            rules: [{
              condition: {
                maxWidth: 600,
              },
              chartOptions: {
                legend: {
                  align: 'center',
                  verticalAlign: 'bottom',
                  x: 0,
                  y: 0,
                },
              },
            }],
          },
          scrollbar: {
            enabled: false
          },
          xAxis: {
            ordinal: false,
            type: 'linear',
            title: {
              text: this.timeUnit,
              style: {
                color: this.mainColor,
              },
            },
            labels: {
              x: 7,
              style: {
                color: this.mainColor,
              },
              format: '{value}',
            },
            tickInterval: 1,
          },
          yAxis: [
            {
              title: {
                text: this.mainUnit,
                style: {
                  color: this.mainColor,
                  fontSize: '12px',
                },
              },
              labels: {
                overflow: 'justify',
                style: {
                  color: this.mainColor,
                },
              },
              gridLineWidth: 0.2,
              minorGridLineWidth: 0.1,
              tickInterval: 1,
              showLastLabel: true,
              showFirstLabel: true,
              opposite: false,
              endOnTick: false,
            }
          ],
        });
      },
      fillChart() {
        Object.values(this.chartData).forEach((singleChartData, index) => {
          this.chart.series[index].setData(jsonCopy(singleChartData));
        })
      },
    },
    watch: {
      chartData() {
        this.createChart();
        this.fillChart();
      },
    },
  };
</script>

<style scoped>
  .highchart {
    display: flex;
    align-self: center;
    margin-top: -5px;
    font-family: 'Helvetica Neue', sans-serif;
  }
</style>
