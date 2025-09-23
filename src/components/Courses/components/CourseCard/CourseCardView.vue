<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCoursesStore } from "../../../../stores/CoursesStore";
import { useUserStore } from "../../../../stores/UserStore";
import ButtonView from "../../../../common/Button/ButtonView.vue";
import formatDate from "../../../../utils/FormatDate";
import formatDuration from "../../../../utils/FormatDuration";
import formatAuthors from "../../../../utils/FormatAuthors";
export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}
const props = defineProps<CourseCardProps>();
const router = useRouter();
const userStore = useUserStore();
const coursesStore = useCoursesStore();
const isAdmin = userStore.isAdmin;
const handleDeleteCourse = () => coursesStore.deleteCourseAsync(props.id);
const handleEditCourse = () => router.push(`update/${props.id}`);
</script>

<template>
  <div class="card">
    <div class="cardLeft">
      <p class="title">{title}</p>
      <p class="description">{description}</p>
    </div>
    <div class="cardRight">
      <div>
        <p>
          <span>Authors: </span>
          {{ formatAuthors(props.authors) }}
        </p>
        <p>
          <span>Duration: </span>
          {{ formatDuration(props.duration) }}
        </p>
        <p>
          <span>Created: </span>
          {{ formatDate(props.creationDate) }}
        </p>
      </div>
      <p class="cardButtons">
        <RouterLink to="/id">
          <ButtonView :label="'SHOW COURSE'" :class-name="'cardShowButton'" />
        </RouterLink>
        <ButtonView
          v-if="isAdmin"
          :label="'delete'"
          :on-click="handleDeleteCourse"
          :class-name="'material-symbols-outlined cardDeleteButton'"
        />
        <ButtonView
          v-if="isAdmin"
          :label="'edit'"
          :on-click="handleEditCourse"
          :class-name="'material-symbols-outlined cardEditButton'"
        />
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  border-left: 8px solid #404040;
  background-color: white;
  border-radius: 4px;
  margin: auto;
  padding: 15px;
  width: 1086px;
  box-shadow: 0 0 5px 5px #55555521;
}

.card:not(:last-child) {
  margin-bottom: 20px;
}

.title {
  font-weight: bold;
  margin: 10px;
  font-size: 20px;
}

.description {
  margin: 10px;
  text-align: justify;
}

.cardLeft {
  width: 70%;
  margin-right: 30px;
}

.cardRight {
  margin-top: 42px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cardRight p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.cardRight p span {
  font-weight: bold;
}

.cardButtons {
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

:deep(.cardShowButton) {
  padding: 2px 20px;
}

:deep(.cardEditButton),
:deep(.cardDeleteButton) {
  font-size: 24px;
  padding: 2px 12px;
  font-weight: 400;
}
</style>
