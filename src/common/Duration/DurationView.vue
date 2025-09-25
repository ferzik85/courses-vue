<script setup lang="ts">
import formatDuration from "../../utils/FormatDuration";
interface DurationProps {
  duration: number;
  className?: string;
}
const props = defineProps<DurationProps>();
const formattedDuration = formatDuration(props.duration).split(" ");
const formattedTime = formattedDuration[0];
const formattedText = formattedDuration[1];
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
