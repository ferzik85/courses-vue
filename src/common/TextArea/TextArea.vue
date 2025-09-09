<script setup lang="ts">
export interface TextAreaProps {
	value?: string;
	onChange: (value: string) => void;
	className?: string;
}
const props = defineProps<TextAreaProps>()
</script>

<template>
	<textarea class="area" :class="props.className" :value="props.value || ''" placeholder="Input text"
	@input="(e: Event) => props.onChange((e.target as HTMLTextAreaElement).value)"
	></textarea>
</template>

<style scoped>
.area {
	border-radius: 4px;
	border: 1px solid #cfcfcf;
	font-family: 'Open Sans', sans-serif;
}
</style>

