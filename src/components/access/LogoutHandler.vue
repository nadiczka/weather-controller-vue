<template>
  <div class="logout-handler">
    <div class="logout-layout-row">
      <div class="logout-layout-text">
        <p class="text-size"
           v-text="`Logged in as ${user.name}`"/>
      </div>
      <div class="logout-layout-button">
        <b-button variant="warning base-button"
                  v-text="'Logout'"
                  class="text-size"
                  v-b-modal.BaseInputModalLogout/>
      </div>
    </div>

    <base-input-modal id="BaseInputModalLogout"
                      ref="BaseInputModalLogout"
                      title-text="Logout confirmation"
                      ok-text="Logout"
                      @ok="logout">

      <template v-slot:inputType>
        <b-row align-h="center">
          <b-spinner v-if="loggingOutFlag"
                     variant="warning"
                     label="Logging out..."/>
        </b-row>
      </template>

    </base-input-modal>
  </div>
</template>

<script>
  import BaseInputModal from "@/components/base/BaseInputModal";
  import {mapState} from "vuex";

  export default {
    name: 'LogoutHandler',
    components: {
      BaseInputModal
    },
    data() {
      return {
        loggingOutFlag: false,
      };
    },
    computed: {
      ...mapState('user', ['user']),
    },
    methods: {
      async logout() {
        this.loggingOutFlag = true;

        await this.sendLogout();

        this.loggingOutFlag = false;
        this.$refs.BaseInputModalLogout.hideModal();
      },
      async sendLogout() {
        return this.$store.dispatch('user/logout');
      },
    },
  };
</script>

<style scoped>
  p {
    margin: 0;
  }

  .logout-layout-row {
    display: flex;
    justify-content: space-between;
  }

  .logout-layout-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 1rem;
  }

  .logout-layout-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 0.5rem;
  }
</style>
