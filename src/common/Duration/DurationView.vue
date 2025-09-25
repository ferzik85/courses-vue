<script setup lang="ts">
import { computed } from "vue";
import formatDuration from "../../utils/FormatDuration";
interface DurationProps {
  duration: number;
  className?: string;
}
const props = defineProps<DurationProps>();
const formattedDuration = computed(() => formatDuration(props.duration).split(" "));
const formattedTime = computed(() => formattedDuration.value[0]);
const formattedText = computed(() => formattedDuration.value[1]);
</script>

<template>
  <span class="spanDuration" :class="props.className">
    <b>{{ formattedTime }}</b> {{ formattedText }}
  </span>
</template>

<style scoped>
.spanDuration {
  font-weight: 400;
}
</style>
