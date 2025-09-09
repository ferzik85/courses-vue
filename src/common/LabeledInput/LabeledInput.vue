<script setup lang="ts">
import Input from '../Input/Input.vue';
import TextArea from '../TextArea/TextArea.vue';

export interface LabeledInputProps {
	name: string;
	onChange: (value: string) => void;
	isInvalid: boolean;
	inputClassName?: string | null;
	isTextArea?: boolean;
	value?: string;
}

const props = defineProps<LabeledInputProps>()
const defaultClassNames = 'labelInput ' + props.inputClassName;
const errorClassNames = 'labelInput ' + props.inputClassName + ' errorBorder';
const assignInputClasses = props.isInvalid ? errorClassNames : defaultClassNames;

</script>

<template>
	<label class="label">
		{{ props.name }}
		<div>
			<TextArea v-if="props.isTextArea" :value="value" :onChange="props.onChange" :className="assignInputClasses"></TextArea>
			<Input v-else :value="value" :onChange="props.onChange" :className="assignInputClasses" />
		</div>
		<p v-if="props.isInvalid" class="error">{{ props.name }} is required.</p>
	</label>
</template>

<style scoped>
.label {
	font-weight: 700;
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
}

.labelInput {
	padding-top: 0;
	padding-bottom: 0;
	height: 48px;
	padding-left: 15px;
	font-size: 16px;
}

.error {
	color: red;
	font-weight: 400;
}

.errorBorder {
	border-color: red;
}
</style>
