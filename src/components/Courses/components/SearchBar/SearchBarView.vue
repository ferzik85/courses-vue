<script setup lang="ts">
import ButtonView from "../../../../common/Button/ButtonView.vue";
import InputView from "../../../../common/Input/InputView.vue";
import { ref } from "vue";
const searchText = ref("");
export interface SearchBarProps {
  onSearchClick: (value: string) => void;
}
const props = defineProps<SearchBarProps>();
const handleChange = (val: string) => {
  searchText.value = val;
  if (!val) props.onSearchClick("");
};
</script>

<template>
  <div class="searchBar">
    <InputView
      :value="searchText"
      :on-change="handleChange"
      :class-name="'searchInput'"
    />
    <ButtonView
      label="SEARCH"
      :on-click="() => props.onSearchClick(searchText)"
    />
  </div>
</template>

<style scoped>
.searchBar {
  display: flex;
  align-items: center;
}

:deep(.searchInput) {
  height: 48px;
  width: 400px;
  margin-right: 15px;
  font-size: 16px;
  padding-left: 15px;
}
</style>
