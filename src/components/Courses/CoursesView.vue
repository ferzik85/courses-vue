<script setup lang="ts">
import { ref, computed } from "vue";
import { useCoursesStore } from "../../stores/CoursesStore";
import { useUserStore } from "../../stores/UserStore";
import CourseCardView from "./components/CourseCard/CourseCardView.vue";
import ButtonView from "../../common/Button/ButtonView.vue";
import SearchBarView from "./components/SearchBar/SearchBarView.vue";
import searchCourses from "../../utils/SearchCourses";
import EmptyCourseListView from "../EmptyCourseList/EmptyCourseListView.vue";
const coursesStore = useCoursesStore();
const userStore = useUserStore();
const coursesWithAuthorNames =  computed(() => coursesStore.getCoursesWithAuthorNames);
const isAdmin = computed(() => userStore.isAdmin);
const searchText = ref("");
const handleSearchClick = (searchValue: string) => {
  searchText.value = searchValue;
};
const noCourses = computed(() => coursesWithAuthorNames.value.length === 0);
const filteredCourses = computed(() =>
  searchCourses(searchText.value, coursesWithAuthorNames.value),
);
</script>
<template>
  <div class="courses">
    <EmptyCourseListView v-if="noCourses" />
    <template v-else>
      <div class="header">
        <SearchBarView :on-search-click="handleSearchClick" />
        <RouterLink v-if="isAdmin" :to="{ name: 'course-add'}">
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
