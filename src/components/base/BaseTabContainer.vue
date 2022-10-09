<template>
  <div class="tab-container">
    <slot name="tab-body"/>
  </div>
</template>

<script>
  export default {
    name: 'BaseTabContainer',
    props: {
      title: {
        type: String,
        require: true,
      },
    },
  };
</script>

<style scoped lang="scss">
  .tab-container {
    padding-top: 1rem;
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
</style>
