<template>
  <b-row>
    <b-col>
      <b-button :style="customStyle"
                :variant="variant"
                class="full-button"
                @click="$emit('click')"
                v-text="btnText"/>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'BaseFullButton',
    props: {
      btnText: {
        type: String,
        require: true,
      },
      variant: {
        type: String,
        default: 'warning',
      },
      customStyle: {
        type: String,
        default: 'warning',
      },
    },
  };
</script>

<style scoped>

</style>
