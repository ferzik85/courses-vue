<script setup lang="ts">
export interface InputProps {
	value?: any;
	onChange?: (value: string) => void;
	className?: string;
}
const props = defineProps<InputProps>()
</script>

<template>
    <input type="text" :value="props.value" class="input" :class="props.className" placeholder="Input text" 
    @input="(e: Event) => props.onChange?.((e.target as HTMLInputElement).value)"
    />
</template>

<style scoped>
.input {
	height: 22px;
	border-radius: 4px;
	border: 1px solid #cfcfcf;
}
</style>

