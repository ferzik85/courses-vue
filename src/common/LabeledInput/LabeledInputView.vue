<script setup lang="ts">
import InputView from "../Input/InputView.vue";
import TextAreaView from "../TextArea/TextAreaView.vue";
import { computed } from "vue";

export interface LabeledInputProps {
  name: string;
  onChange: (value: string) => void;
  isInvalid: boolean;
  inputClassName?: string | null;
  isTextArea?: boolean;
  value?: string;
}

const props = defineProps<LabeledInputProps>();
const assignInputClasses = computed(
  () =>
    (props.isInvalid ? "labelInput errorBorder" : "labelInput") +
    (props.inputClassName ? " " + props.inputClassName : ""),
);
</script>

<template>
  <label class="label">
    {{ props.name }}
    <div>
      <TextAreaView
        v-if="props.isTextArea"
        :value="value"
        :on-change="props.onChange"
        :class-name="assignInputClasses"
      ></TextAreaView>
      <InputView
        v-else
        :value="value"
        :on-change="props.onChange"
        :class-name="assignInputClasses"
      />
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
