<template>
  <div>
    <base-full-button v-b-modal.BaseInputModalUpload
                      variant="info"
                      customStyle="background-color: lightblue"
                      btn-text="Upload configuration from txt file"/>

    <base-input-modal id="BaseInputModalUpload"
                      ref="BaseInputModalUpload"
                      title-text="Input config file"
                      @ok="handleOk">

      <template v-slot:inputType>
        <b-form-file v-model="uploadedConfigFile"
                     :state="fileLoaded"
                     accept=".txt"
                     class="mb-2"
                     placeholder="Choose a config file"/>
      </template>

    </base-input-modal>

  </div>
</template>

<script>
  import BaseFullButton from '@/components/base/BaseFullButton';
  import BaseInputModal from '@/components/base/BaseInputModal'
  import {jsonCopy} from "@/helpers";

  export default {
    name: "ConfigurationUploadFileButton",
    data() {
      return {
        uploadedConfigFile: null,
        uploadedConfigText: null,
      };
    },
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
      fileLoaded() {
        return !!this.uploadedConfigFile;
      },
      uploadedConfigInJson() {
        return JSON.parse(this.uploadedConfigText);
      },
      finalConfigData() {
        return this.exportJsonToConfigData();
      },
    },
    watch: {
      uploadedConfigFile: {
        handler() {
          this.getTextOfUploadedFile();
        },
      },
    },
    methods: {
      handleOk() {
        this.$store.commit(`${this.controlArea}/setWholeConfigData`, this.finalConfigData);
        this.$emit('configUploaded');
        this.$refs.BaseInputModalUpload.hideModal();
      },
      getTextOfUploadedFile() {
        const callback = (result) => { this.uploadedConfigText = result };

        const reader = new FileReader();
        reader.onload = function () {
          callback(reader.result);
        };
        reader.readAsText(this.uploadedConfigFile)
      },
      segmentsConfigFromArrayToObject(configList) {
        const segmentsConfigObject = {};
        configList.forEach((segment, idx) => {
          segmentsConfigObject[idx+1] = segment;
        })
        return segmentsConfigObject;
      },
      exportJsonToConfigData() {
        const listOfConfig = jsonCopy(this.uploadedConfigInJson.config);
        listOfConfig.map((el) => {
          el.segmentsConfig = this.segmentsConfigFromArrayToObject(el.segmentsConfig);
        })
        return listOfConfig;
      },
    },
  }
</script>

<style scoped>

</style>
