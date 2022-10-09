<template>
  <base-tab-container title="Inside Colling Alarms">
    <template v-slot:tab-body>
      <b-col>
        <b-row  v-for="el in signals"
                :key="el.name">
          <b-col>
            <p v-text="el.name"
               style="margin: 0"/>
          </b-col>
          <b-col>
            <base-round-div size="2em"
                            border-width="2px"
                            :state="el.state"/>
          </b-col>
        </b-row>
      </b-col>
    </template>
  </base-tab-container>
</template>

<script>
  import BaseTabContainer from "@/components/base/BaseTabContainer";
  import BaseRoundDiv from "@/components/base/BaseRoundDiv";

  export default {
    name: "TheWaterLevelTab",
    components: {
      BaseTabContainer,
      BaseRoundDiv,
    },
    computed: {
      signals() {
        return [
          { name: `Swimming pool water level alarm`, value: 'SwimmingPool', state: 'none' },
          { name: `Rain level alarm`, value: 'Rain', state: 'none', },
          { name: `Level of water in barrel`, value: 'Barrel', state: 'none', },
        ];
      },
    },
  }
</script>

<style scoped>

</style>

