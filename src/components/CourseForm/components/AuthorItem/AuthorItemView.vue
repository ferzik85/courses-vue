<script setup lang="ts">
import ButtonView from "../../../../common/Button/ButtonView.vue";
export interface AuthorItemProps {
  id: string;
  name: string;
  authorItemClass?: string | null;
  onAddClick?: (e: Event, id: string) => void;
  onDeleteClick: (e: Event, id: string) => void;
  addIsDisabled?: boolean;
}
const props = defineProps<AuthorItemProps>();
const style = "authorItem " + (props.authorItemClass ?? "");
</script>

<template>
  <div :class="style">
    <span class="authorItemName">{{ props.name }}</span>
    <ButtonView
      v-if="!props.addIsDisabled"
      :label="'add'"
      :on-click="(e) => props.onAddClick && props.onAddClick(e, props.id)"
      :class-name="'material-symbols-outlined authorItemButton'"
    ></ButtonView>
    <ButtonView
      :label="'delete'"
      :on-click="(e) => props.onDeleteClick(e, props.id)"
      :class-name="'material-symbols-outlined authorItemButton'"
    ></ButtonView>
  </div>
</template>

<style scoped>
.authorItem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.authorItemName {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
}

:deep(.authorItemButton) {
  font-size: 18px;
  margin-left: 10px;
  background-color: white;
  border: none;
  color: black;
  padding: 0;
  font-weight: 400;
  cursor: pointer;
  height: 20px;
}
</style>
