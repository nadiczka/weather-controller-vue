<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <h2 class="left-base-color-text">Config temperature ramp</h2>
      </b-col>
    </b-row>

    <control-upload-file-button :control-area="controlArea"/>

    <b-row>
      <b-col>
        <p>or</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <text-and-input-field v-model="wholeConfigParams.numberOfSegments"
                              text="Choose number of ramp segments"/>
      </b-col>
    </b-row>

    <b-row>
      <b-col style="display: flex">
        <h3 class="left-base-color-text">Segment params</h3>
      </b-col>
    </b-row>

    <b-row class="border-div">
      <b-col>
        <text-and-select-field v-model="currentSegmentNumber"
                               :options="numberOfSegmentsOptions"
                               text="Choose segment"/>

        <control-segment-params-form :key="clearSegmentsParamsKey"
                                     v-model="wholeConfigParams.segmentsConfig"
                                     :current-segment-number="currentSegmentNumber"
                                     :main-unit="mainUnit"
                                     :number-of-segments="wholeConfigParams.numberOfSegments"/>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <control-save-file-button :control-area="controlArea"/>

        <base-full-button btn-text="Update chart"
                          @click="updateChart"/>

        <base-full-button btn-text="Clear configuration"
                          variant="danger"
                          @click="clearAll"/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import TextAndInputField from '@/components/controlTab/textAndField/TextAndInputField';
  import TextAndSelectField from '@/components/controlTab/textAndField/TextAndSelectField';
  import ControlSegmentParamsForm from '@/components/controlTab/ControlSegmentParamsForm';
  import ControlUploadFileButton from '@/components/controlTab/ControlUploadFileButton';
  import ControlSaveFileButton from '@/components/controlTab/ControlSaveFileButton';
  import BaseFullButton from '@/components/base/BaseFullButton';
  import { jsonCopy } from '@/helpers';
  import { mapState } from 'vuex';

  export default {
    name: 'ControlForm',
    components: {
      ControlSegmentParamsForm,
      ControlUploadFileButton,
      ControlSaveFileButton,
      TextAndInputField,
      TextAndSelectField,
      BaseFullButton,
    },
    props: {
      configDataIndex: {
        type: Number,
        default: 0,
      },
      mainUnit: {
        type: String,
        default: `\u00B0C`,
      },
    },
    data() {
      return {
        unit: 'min',
        currentSegmentNumber: '',
        emptyConfigParams: {
          numberOfSegments: '',
          segmentsConfig: {},
        },
        timeOfProcess: '00:00:00',
        wholeConfigParams: {},
        clearSegmentsParamsKey: false,
      };
    },
    watch: {
      wholeConfigParams: {
        handler() {
          const commitData = {
            configDataIndex: this.configDataIndex,
            data: this.wholeConfigParams,
          };
          this.$store.commit(`${this.controlArea}/setConfigData`, commitData);
        },
        deep: true,
      },
      configDataObject: {
        handler(curVal) {
          if (curVal !== this.wholeConfigParams) {
            this.wholeConfigParams = curVal;
          }
        },
      },
      'wholeConfigParams.numberOfSegments': {
        handler(curVal) {
          if (curVal !== '') {
            this.currentSegmentNumber = '1';
          } else {
            this.currentSegmentNumber = '';
          }
        },
      },
    },
    computed: {
      ...mapState(['controlArea']),
      configDataObject() {
        if (this.controlArea) {
          return this.$store.state[this.controlArea].configData[this.configDataIndex];
        }
        return {};
      },
      numberOfSegmentsOptions() {
        const range = this.wholeConfigParams.numberOfSegments;
        if (range) {
          return this.createArray(range);
        }
        return [];
      },
    },
    methods: {
      createArray(range) {
        return Array.from({ length: range }, (_, idx) => idx + 1);
      },
      clearVisibleConfig() {
        this.setEmptyWholeConfigParams();
        this.clearSegmentsParamsKey = !this.clearSegmentsParamsKey;
      },
      clearAll() {
        this.$store.commit(`${this.controlArea}/clearWholeConfigData`);
        this.clearVisibleConfig();
      },
      setEmptyWholeConfigParams() {
        this.wholeConfigParams = jsonCopy(this.emptyConfigParams);
      },
      updateChart() {
        const chartData = {
          segmentsConfig: jsonCopy(this.$store.getters[`${this.controlArea}/getConfigData`]),
          timeUnit: this.unit,
          mainUnit: this.mainUnit,
        };
        this.$store.commit(`${this.controlArea}/setWholeConfigChartData`, chartData);
      },
    },
    created() {
      this.clearVisibleConfig();
    },
  };
</script>

<style lang="scss" scoped>
  .border-div {
    background-color: rgba(78, 84, 50, 0.2);
    border: 4px solid $base-button-color;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .left-base-color-text {
    color: $base-button-color;
    justify-content: flex-start;
  }
</style>
