<template>
  <div class="lines">
    <div v-for="(el, idx) in value"
         :key="el.label">

      <p v-text="el.label"/>

      <p v-if="el.data && el.data.length > 0"
         :style="`background-color: ${colors[idx]}`"
         v-text="el.data[el.data.length - 1][1].toExponential(2)"/>
    </div>
  </div>
</template>

<script>
  import { colors } from '@/helpers';

  export default {
    name: 'BaseParagraphsWithBackgrounds',
    props: {
      value: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        colors,
      };
    },
  };
</script>

<style scoped>
  .lines {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
</style>
