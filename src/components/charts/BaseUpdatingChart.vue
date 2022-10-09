<template>
  <div/>
</template>

<script>
  import * as Highcharts from 'highcharts/highstock';
  import Moment from 'moment';
  import MomentTimeZone from 'moment-timezone';
  import { jsonCopy, colors } from "@/helpers";

  window.moment = Moment;
  MomentTimeZone();

  export default {
    name: 'BaseUpdatingChart',
    data() {
      return {
        mainColor: 'rgb(1, 133, 190)',
        chart: undefined,
        rerender: false,
        colors,
      };
    },
    props: {
      numberOfSignals: {
        type: Number,
        require: true,
      },
      attributeName: {
        type: String,
        require: true,
      },
      controlArea: {
        type: String,
        require: true,
      },
      attributesPartNames: {
        type: Array,
        require: true,
      },
      attributesLabels: {
        type: Array,
        require: true,
      },
      attributesValues: {
        type: Array,
        require: true,
      },
      chartHeight: {
        type: String,
        default: null,
      },
    },
    methods: {
      createChart() {
        const getNumber = () => { return this.numberOfSignals };
        const getAttributesNames = () => { return this.attributesPartNames };
        const getAttributesValues = () => { return this.attributesValues };
        this.chart = Highcharts.stockChart(this.$el, {
          chart: {
            backgroundColor: 'lavender',
            height: this.chartHeight,
          },
          time: {
            useUTC: false
          },
          rangeSelector: {
            labelStyle: {
              display: 'none'
            },
            buttonTheme: {
              fill: 'none',
              stroke: 'none',
              style: {
                color: this.mainColor,
              },
              states: {
                hover: {
                  fill: this.mainColor,
                  style: {
                    color: 'gray',
                  },
                },
                select: {
                  fill: this.mainColor,
                  style: {
                    color: 'white',
                  },
                },
              },
            },
            buttons: [
              {
                count: 1,
                type: 'minute',
                text: '1min'
              },
              {
                count: 1,
                type: 'hour',
                text: '1hour'
              },
              {
                count: 1,
                type: 'day',
                text: '1day'
              }
            ],
            inputEnabled: false,
            selected: 0,
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
            for(let i=0; i<getNumber(); i+=1) {
              const data = jsonCopy(getAttributesValues()[i])
              const dataLength = data.length;
              const time = (new Date()).getTime();
              for (let j = -999 + dataLength; j <= 0; j += 1) {
                data.push([time + j * 1000, 0]);
              }
              const emptySeries = {
                name: getAttributesNames()[i],
                connectNulls: true,
                shadow: false,
                color: colors[i],
                data: data,
              };
              series.push(jsonCopy(emptySeries));
            }
            return series;
          }()),
          legend: {
            enabled: true,
            align: 'center',
            backgroundColor: 'none',
            borderWidth: '0px',
            verticalAlign: 'bottom',
            shadow: true,
            itemStyle: {
              color: this.mainColor,
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
            barBackgroundColor: this.mainColor,
            barBorderRadius: 0,
            barBorderWidth: 0,
            buttonBackgroundColor: 'lavender',
            buttonBorderWidth: 0,
            buttonBorderRadius: 0,
            trackBackgroundColor: 'lavender',
            trackBorderWidth: 1,
            trackBorderRadius: 0,
            trackBorderColor: this.mainColor,
          },
          xAxis: {
            type: 'datetime',
            labels: {
              overflow: 'justify',
              style: {
                color: this.mainColor,
              },
            },
          },
          yAxis: [
            {
              title: {
                text: this.yAxesLabel,
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
              tickInterval: 10,
              showLastLabel: true,
              showFirstLabel: true,
              opposite: false,
              endOnTick: false,
            }
          ],
        });
      },
    },
    computed: {
      lastPointsValues() {
        return this.$store.getters[`${this.controlArea}/getLastPointsValues`](this.attributeName);
      },
    },
    watch: {
      lastPointsValues: {
        handler() {
          for(let i=0; i<this.numberOfSignals; i+=1) {
            this.chart.series[i].addPoint(this.lastPointsValues[this.attributesLabels[i]], false, true);
          }
          const setExtremes = this.chart.xAxis[0].max === this.chart.xAxis[0].dataMax && this.chart.fixedRange;
          const newDate = new Date().getTime();
          if (setExtremes) this.chart.xAxis[0].setExtremes(newDate - this.chart.fixedRange, newDate);
          this.chart.redraw();
        },
        deep: true,
      },
    },
    mounted() {
      this.createChart();
    },
  };
</script>

<style scoped>

</style>
