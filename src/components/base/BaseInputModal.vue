<template>
  <b-modal :id="id"
           :title="titleText"
           centered
           title-class="text-size"
           hide-footer>

    <slot name="inputType"/>

    <div class="button-right">

      <b-btn @click="hideModal"
             class="text-size"
             v-text="'Cancel'"/>

      <b-btn class="base-button ml-2 text-size"
             variant="warning"
             @click="handleOk"
             v-text="okText"/>

    </div>
  </b-modal>
</template>

<script>
  export default {
    name: "BaseInputModal",
    props: {
      titleText: {
        type: String,
        require: true,
      },
      okText: {
        type: String,
        default: 'Accept',
      },
      id: {
        type: String,
        default: 'InputModal',
      },
    },
    methods: {
      hideModal() {
        this.$nextTick(() => {
          this.$bvModal.hide(this.id);
        });
      },
      handleOk() {
        this.$emit('ok');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .button-right {
    display: flex;
    justify-content: flex-end;
  }

  ::v-deep .text-size {
    font-size: max(1rem, 1vw);
  }
  ::v-deep .modal-content {
    background-color: $background-color;
  }
</style>
