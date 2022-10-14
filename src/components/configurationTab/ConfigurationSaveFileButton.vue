<template>
  <div>
    <base-full-button v-b-modal.BaseInputModalSave
                      class="info-button"
                      variant="warning"
                      customStyle="background-color: $base-button-color"
                      btn-text="Save configuration to file"/>

    <base-input-modal id="BaseInputModalSave"
                      ref="BaseInputModalSave"
                      title-text="Save config to new file"
                      @ok="handleOk">

      <template v-slot:inputType>
        <b-form-input v-model="configName"
                      class="mb-2"/>
      </template>

    </base-input-modal>

  </div>
</template>

<script>
  import {jsonCopy} from "@/helpers";
  import BaseFullButton from '@/components/base/BaseFullButton';
  import BaseInputModal from '@/components/base/BaseInputModal'

  export default {
    name: 'ConfigurationSaveFileButton.vue',
    props: {
      controlArea: {
        type: String,
        require: true,
      },
    },
    components: {
      BaseFullButton,
      BaseInputModal,
    },
    computed: {
      configData() {
        if (this.controlArea) {
          return this.$store.state[this.controlArea].configData;
        }
        return [];
      },
    },
    data() {
      return {
        configName: '',
      };
    },
    methods: {
      handleOk() {
        this.saveJSONConfig(this.configData, this.controlArea);
        this.$refs.BaseInputModalSave.hideModal();
      },
      segmentsConfigFromObjectToArray(configObject) {
        const segmentsConfigArray = [];
        Object.values(configObject).forEach((segment) => {
          segmentsConfigArray.push(segment);
        })
        return segmentsConfigArray;
      },
      exportConfigToJSON(listOfData, controlArea) {
        const configList = [];
        listOfData.forEach((data) => {
          let dataCopy = jsonCopy(data);
          let configStruct = {
            ...dataCopy,
            segmentsConfig: this.segmentsConfigFromObjectToArray(dataCopy.segmentsConfig),
          }
          configList.push(configStruct)
        })
        const wholeConfig = {
          controlArea: controlArea,
          config: configList
        }
        return JSON.stringify(wholeConfig);
      },
      downloadFile(content, fileName, contentType) {
        const a = document.createElement("a");
        const file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
      },
      saveJSONConfig(listOfData, controlArea) {
        const JSONConfig = this.exportConfigToJSON(listOfData, controlArea);
        const configFileName = !!this.configName ? this.configName : 'rampConfiguration';
        this.downloadFile(JSONConfig, `${configFileName}.txt`, 'text/plain');
      }
    },
  }
</script>

<style scoped>

</style>
