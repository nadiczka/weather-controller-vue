<template>
  <b-row align-v="center"
         class="mb-1">
    <b-col align="left">
      <label v-text="text"/>
    </b-col>
    <b-col>
      <b-form-input v-model="valueFromProp"
                    style="min-width: 5rem;"
                    :type="inputType"
                    @blur="emitFocusOut"/>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'TextAndInputField',
    props: {
      value: {
        type: [String, Number],
        default: '',
      },
      text: {
        type: String,
        require: true,
      },
      inputType: {
        type: String,
        default: 'number',
      },
    },
    data() {
      return {
        valueFromProp: this.value,
      };
    },
    watch: {
      valueFromProp() {
        let value = this.valueFromProp;
        if (this.inputType === 'number' && value !== '') {
          value = Number(value)
        }
        this.$emit('input', value);
      },
      value() {
        this.valueFromProp = this.value;
      },
    },
    methods: {
      emitFocusOut() {
        this.$emit('focusOut');
      },
    },
  };
</script>

<style scoped>

</style>
