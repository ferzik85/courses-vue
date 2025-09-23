<script setup lang="ts">
import { ref } from "vue";
import CourseCardView from "./components/CourseCard/CourseCardView.vue";
import ButtonView from "../../common/Button/ButtonView.vue";
import SearchBarView from "./components/SearchBar/SearchBarView.vue";
import searchCourses from "../../utils/SearchCourses";
import EmptyCourseListView from "../EmptyCourseList/EmptyCourseListView.vue";
import { useCoursesStore } from "../../stores/CoursesStore";
import { useUserStore } from "../../stores/UserStore";
const coursesStore = useCoursesStore();
const userStore = useUserStore();
const coursesWithAuthorNames = coursesStore.getCoursesWithAuthorNames;
const isAdmin = userStore.isAdmin;
const searchText = ref("");
const handleSearchClick = (searchValue: string) =>
  (searchText.value = searchValue);
const noCourses = coursesWithAuthorNames.length === 0;
const filteredCourses = searchCourses(searchText.value, coursesWithAuthorNames);
</script>
<template>
  <div class="courses">
    <EmptyCourseListView v-if="noCourses" />
    <template v-else>
      <div class="header">
        <SearchBarView :on-search-click="handleSearchClick" />
        <RouterLink v-if="isAdmin" to="/add">
          <ButtonView :label="'ADD NEW COURSE'" />
        </RouterLink>
      </div>
      <CourseCardView
        v-for="course in filteredCourses"
        :id="course.id"
        :key="course.id"
        :title="course.title"
        :description="course.description"
        :creation-date="course.creationDate"
        :duration="course.duration"
        :authors="course.authors"
      />
    </template>
  </div>
  ;
</template>
<style scoped>
.courses {
  display: flex;
  flex-direction: column;
  width: 1122px;
  margin: auto;
}

.header {
  display: flex;
  margin-top: 70px;
  margin-bottom: 20px;
}

:deep(.header a) {
  margin-left: auto;
}
</style>
