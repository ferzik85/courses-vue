<script setup lang="ts">
export type ButtonType = "button" | "submit" | "reset";
export interface ButtonProps {
  label: string;
  onClick?: (event: Event) => void;
  type?: ButtonType;
  formName?: string;
  className?: string;
}
const props = defineProps<ButtonProps>();
</script>

<template>
  <button
    class="button"
    :class="props.className"
    :type="props.type || 'button'"
    :form="props.formName"
    @click="props.onClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.button {
  background-color: #007298;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 6px 32px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  height: 50px;
}
</style>
