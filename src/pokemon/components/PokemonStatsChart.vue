<template>
  <div>
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
});

const chart = ref<null | HTMLCanvasElement>(null);

onMounted(() => {
  if (chart.value) {
    new Chart(chart.value, {
      type: 'radar',
      data: {
        labels: props.stats.map((stat: any) => stat.stat.name),
        datasets: [{
          label: 'Stats',
          data: props.stats.map((stat: any) => stat.base_stat),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
    });
  }
});
</script>

<style scoped>
canvas {
  max-width: 400px;
}
</style>
