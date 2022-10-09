<template>
  <div :style="`background-color: ${divColor}; width: ${size}; height: ${size}; border-width: ${borderWidth}`"/>
</template>

<script>
  export default {
    name: 'BaseRoundDiv',
    props: {
      state: {
        type: String,
        default: 'none',
      },
      size: {
        type: String,
        default: '1.5em'
      },
      borderWidth: {
        type: String,
        default: '2px'
      },
    },
    computed: {
      divColor() {
        if (this.state === 'danger') {
          return 'red';
        } else if (this.state === 'active') {
          return '#1FD512D5';
        } else {
          return 'dimgray';
        }
      },
    },
  };
</script>

<style scoped>
  div {
    background-color: rgba(105, 105, 105, 0.55);
    opacity: 1;
    border-radius: 100%;
    margin-top: 0.5em;
    margin-left: 0.5em;
    border: solid #3e3e3e;
  }
</style>
