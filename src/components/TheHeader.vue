<template>
  <div class="app-header">

    <div class="logo">
      <img id="clickableElement"
           alt="Weather logo from https://iconscout.com/icons/weather"
           src="@/assets/weather.svg"
           @click="moveToHome"/>
    </div>

    <div class="header-text">
      <p id="header-title">
        Weather Controller
      </p>
    </div>

    <div class="date-time">
      <p id="datetime">
        {{ dateTime }}
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'TheHeader',
    data() {
      return { dateTime: '' };
    },
    mounted() {
      setInterval(this.getDateTime, 2000);
    },
    methods: {
      getDateTime() {
        this.dateTime = this.$moment().format('dddd,  h:mm a MMMM Do YYYY');
      },
      moveToHome() {
        this.$router.push('/home');
      },
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
  };
</script>

<style lang="scss" scoped>
  #clickableElement {
    cursor: pointer;
  }

  .app-header {
    display: flex;
    width: 100%;
    padding-top: 2vh;
    justify-content: space-between;
  }

  .logo {
    margin-left: 1rem;
    flex-basis: 20%;
  }

  .logo img{
    float: left;
    width: min(100px, 10vh);
  }

  .header-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 40%;
  }

  .date-time {
    margin-right: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 20%;
  }

  #header-title {
    font-size: max(2rem, 4vw);
    margin: 0;
  }

  #datetime {
    float: right;
    font-size: max(1em, 2vw);
    margin: 0;
  }

</style>
