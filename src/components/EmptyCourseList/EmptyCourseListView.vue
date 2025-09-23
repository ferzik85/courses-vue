<script setup lang="ts">
import ButtonView from "../../common/Button/ButtonView.vue";
import { useUserStore } from "../../stores/UserStore";
const userStore = useUserStore();
const isAdminUser = userStore.isAdmin;
// fix routing issue
</script>
<template>
  <div class="emptyListRow">Your List Is Empty</div>
  <template v-if="isAdminUser">
    <div class="emptyListRow">
      Please use &apos;Add New Course&apos; button to add your first course
    </div>
    <div class="emptyListRow">
      <RouterLink to="/add">
        <ButtonView label="ADD NEW COURSE" />
      </RouterLink>
    </div>
  </template>
  <div v-else class="emptyListRow">
    You don&apos;t have permissions to create a course. Please log in as ADMIN.
  </div>
</template>

<style scoped>
.emptyListRow {
  margin: auto;
  margin-top: 20px;
}

.emptyListRow:first-of-type {
  font-weight: bold;
  margin-top: 300px;
  font-size: 32px;
}
</style>
