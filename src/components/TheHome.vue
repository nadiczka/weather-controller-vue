<template>
  <div class="container">
    <b-button v-for="button in buttons"
              :key="button.text"
              class="home-button"
              @click="button.onClick"
              variant="warning"
              v-text="button.text"/>
  </div>
</template>

<script>
  export default {
    name: 'TheHome',
    data() {
      return {
        buttons: {
          moveToOutside: { onClick: this.moveToOutside, text: 'Outside the house' },
          moveToInside: { onClick: this.moveToInside, text: 'Inside the house' },
        },
      };
    },
    methods: {
      moveToOutside() {
        this.$router.push('/outside')
      },
      moveToInside() {
        this.$router.push('/inside')
      },
    },
  };
</script>

<style scoped lang="scss">
  .home-button {
    background-color: $base-button-color;
    color: $base-button-font-color;
    border: white;
    font-size: 4vh;
    margin-bottom: 5vh;
    height: 10vh;
    border-radius: 20px;
  }
  .container {
    margin-top: 15vh;
    width: clamp(30rem, 30%, 50rem);
    display: flex;
    flex-direction: column;
  }
</style>
