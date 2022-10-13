<template>
  <b-row align-v="center"
         class="mb-1">
    <b-col align="left">
      <label v-text="text"/>
    </b-col>
    <b-col>
      <b-form-select v-model="valueFromProp"
                     :options="options"
                     class="select-item"/>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'TextAndSelectField',
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      text: {
        type: String,
        require: true,
      },
      options: {
        type: Array,
        require: true,
      },
    },
    data() {
      return {
        valueFromProp: this.value,
      };
    },
    watch: {
      valueFromProp() {
        this.$emit('input', this.valueFromProp);
      },
      value() {
        this.valueFromProp = this.value;
      },
    },
  };
</script>

<style scoped>

</style>
