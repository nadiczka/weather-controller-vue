<template>
  <div>
    <text-and-input-field v-model="currentSegmentParams.startValue"
                          :text="`Start Temp [${mainUnit}]`"/>

    <text-and-input-field v-model="currentSegmentParams.stopValue"
                          :text="`Stop Temp [${mainUnit}]`"/>

    <text-and-input-field v-model="currentSegmentParams.segmentTimeMin"
                          :text="`Segment Time [min]`"/>

    <text-and-input-field v-model="currentSegmentParams.steps"
                          text="Steps"/>
  </div>
</template>

<script>
  import TextAndInputField from "@/components/configurationTab/textAndField/TextAndInputField";
  import {jsonCopy} from "@/helpers";

  export default {
    name: "ConfigurationSegmentParamsForm",
    props: {
      value: {
        type: Object,
        require: true,
      },
      currentSegmentNumber: {
        type: [String, Number],
        require: true,
      },
      numberOfSegments: {
        type: [String, Number],
        require: true,
      },
      mainUnit: {
        type: String,
        require: true,
      },
    },
    components: {
      TextAndInputField,
    },
    data() {
      return {
        segmentsConfig: {},
        currentSegmentParams: {},
        emptySegmentParams: {
          startValue: '',
          stopValue: '',
          segmentTimeMin: '',
          steps: '',
        },
      };
    },
    created() {
      this.currentSegmentParams = jsonCopy(this.emptySegmentParams);
    },
    watch: {
      value: {
        handler() {
          this.segmentsConfig = this.value;
        },
      },
      segmentsConfig: {
        handler() {
          this.$emit('input', this.segmentsConfig);
        },
        deep: true,
      },
      currentSegmentParams: {
        handler() {
          if (this.currentSegmentNumber !== '') {
            this.updateSegmentParams();
          }
        },
        deep: true,
      },
      numberOfSegments: {
        handler() {
          if (Object.keys(this.value).length !== this.numberOfSegments) {
            this.setEmptySegmentsConfig();
          }
        },
      },
      currentSegmentNumber: {
        handler(curSeg, oldSeg) {
          if ((oldSeg === '' && this.isEmptySegment(this.segmentsConfig[curSeg]))) {
            this.updateSegmentParams();
          } else {
            this.setCurrentSegmentParams(curSeg);
          }
        }
      },
    },
    methods: {
      isEmptySegment(segment) {
        let isEmpty = true;
        Object.values(segment).forEach((val) => {
          if (val !== '') {
            isEmpty = false;
          }
        });
        return isEmpty;
      },
      setEmptySegmentsConfig() {
        let tempParams = {};
        if (this.numberOfSegments) {
          for (let i = 1; i < this.numberOfSegments + 1; i++) {
            tempParams[i] = jsonCopy(this.emptySegmentParams);
          }
        }
        this.segmentsConfig = tempParams;
      },
      setCurrentSegmentParams(segment) {
        if (segment === '') {
          this.currentSegmentParams = jsonCopy(this.emptySegmentParams);
        } else {
          this.currentSegmentParams = this.segmentsConfig[segment];
        }
      },
      updateSegmentParams() {
        this.segmentsConfig[this.currentSegmentNumber] = this.currentSegmentParams;
        this.handleStartAndStopTemps();
      },
      handleStartAndStopTemps() {
        const {startValue, stopValue} = this.currentSegmentParams;

        const previousSegment = this.segmentsConfig[Number(this.currentSegmentNumber) - 1]
        if (startValue && previousSegment) {
          previousSegment.stopValue = startValue;
        }
        const nextSegment = this.segmentsConfig[Number(this.currentSegmentNumber) + 1]
        if (stopValue && nextSegment) {
          nextSegment.startValue = stopValue;
        }
      },
    },
  }
</script>

<style scoped>

</style>
