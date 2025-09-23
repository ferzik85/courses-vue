<script setup lang="ts">
import { computed } from "vue";
import InputView from "../Input/InputView.vue";
import DurationView from "../Duration/DurationView.vue";
import validateDuration from "../../utils/ValidateDuration";

export interface DurationInputProps {
  name: string;
  duration: number;
  onChange: (value: string) => void;
  isInvalid: boolean;
  inputClassName?: string;
}

const props = defineProps<DurationInputProps>();

const handleChange = (value: string) => {
  let val = value;
  if (!validateDuration(value)) val = "";
  props.onChange(val);
};

const inputClasses = computed<string>(() => {
  return props.isInvalid
    ? "durationInput errorBorder " + props.inputClassName
    : "durationInput " + props.inputClassName;
});
</script>

<template>
  <label class="duration">
    {{ props.name }}
    <div>
      <InputView
        :value="duration"
        :on-change="handleChange"
        :class-name="inputClasses"
      />
      <DurationView
        :duration="validateDuration(duration) ? duration : 0"
        :class-name="'durationHours'"
      />
    </div>
    <p v-if="props.isInvalid" class="error">{{ props.name }} is required.</p>
  </label>
</template>

<style scoped>
.duration {
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.durationInput {
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

.durationHours {
  margin-left: 15px;
}
</style>
