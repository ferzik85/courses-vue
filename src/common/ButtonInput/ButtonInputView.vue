<script setup lang="ts">
import { ref, computed } from "vue";
import InputView from "../Input/InputView.vue";
import ButtonView from "../Button/ButtonView.vue";

export interface ButtonInputProps {
  labelName: string;
  buttonName: string;
  onClick: (value: string) => void;
  validateInput: (value: string) => boolean;
  inputClassName?: string;
}
const props = defineProps<ButtonInputProps>();
const val = ref("");
const invalid = ref(false);

const handleChange = (value: string) => {
  val.value = value;
  invalid.value = false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClick = (_: Event) => {
  invalid.value = !props.validateInput(val.value);
  // possibly a bug somewhere here
  if (invalid.value) return;
  props.onClick(val.value);
  val.value = "";
};

const inputClasses = computed<string>(() => {
  return invalid.value
    ? "labelInput errorBorder " + props.inputClassName
    : "labelInput " + props.inputClassName;
});
</script>

<template>
  <label class="label">
    {{ props.labelName }}
    <div>
      <InputView :value="val" :on-change="handleChange" :class-name="inputClasses">
      </InputView>
      <ButtonView
        :label="props.buttonName"
        :on-click="handleClick"
        :class-name="'labelButton'"
      >
      </ButtonView>
    </div>
    <p v-if="invalid" class="error">{{ props.labelName }} is required.</p>
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

.labelButton {
  height: 50px;
  font-size: 16px;
  margin-left: 15px;
}
</style>
