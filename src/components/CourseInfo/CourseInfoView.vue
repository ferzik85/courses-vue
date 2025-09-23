<script setup lang="ts">
import { useRoute } from "vue-router";
import ButtonView from "../../common/Button/ButtonView.vue";
import DurationView from "../../common/Duration/DurationView.vue";
import formatDate from "../../utils/FormatDate";
import formatAuthors from "../../utils/FormatAuthors";
import { useCoursesStore } from "../../stores/CoursesStore";
import { computed } from "vue";
const coursesStore = useCoursesStore();
const route = useRoute();
const courseId = computed(() => route.params.courseId as string | undefined);
const course = computed(() =>
  courseId.value ? coursesStore.getCourseWithAuthorName(courseId.value) : null
);
const courseIsFound = computed(() => course.value !== null);
</script>

<template>
  <div class="courseInfo">
    <template v-if="courseIsFound">
      <div class="courseInfoTitle">{{ course!.title }}</div>
      <div class="courseDescription">
        <div>Description:</div>
        <div class="courseDescriptionLayout">
          <div class="courseDescriptionText">
            {{ course!.description }}
          </div>
          <div class="courseDescriptionMetadata">
            <div>
              <span>ID:</span>
              <span>{{ course!.id }}</span>
            </div>
            <div>
              <span>Duration:</span>
              <DurationView :duration="course!.duration" />
            </div>
            <div>
              <span>Created:</span>
              <span>{{ formatDate(course!.creationDate) }}</span>
            </div>
            <div>
              <span>Authors:</span>
              <span>{{ formatAuthors(course!.authors) }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="courseIsNotFound">Course is not found</div>
    <div>
      <RouterLink to="/courses">
        <ButtonView :label="'BACK'" :class-name="'courseDescriptionButton'" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.courseInfo {
  display: flex;
  flex-direction: column;
  width: 1125px;
  margin: auto;
}

.courseInfo > div:last-of-type {
  width: 100%;
  text-align: right;
  margin-top: 20px;
}

.courseInfoTitle {
  font-weight: bold;
  font-size: 24px;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  margin-top: 30px;
}

.courseDescription {
  background-color: white;
  padding: 60px;
}

.courseDescription > div:first-of-type {
  margin-bottom: 10px;
  font-weight: bold;
}

.courseDescriptionLayout {
  display: flex;
  margin: auto;
}

.courseDescriptionText {
  text-align: justify;
  border-right: 1px solid #e8e8e8;
  padding-right: 20px;
  width: 487px;
  font-size: 16px;
}

.courseDescriptionMetadata {
  padding-left: 20px;
}

.courseDescriptionMetadata > div {
  padding-top: 6px;
  padding-bottom: 10px;
}

.courseDescriptionMetadata > div span:first-of-type {
  margin-bottom: 10px;
  font-weight: bold;
  min-width: 100px;
  font-size: 16px;
  display: inline-block;
}

:deep(.courseDescriptionButton) {
  margin-top: 30px;
  width: 185px;
}

.courseIsNotFound {
  margin: auto;
  margin-top: 30px;
  font-size: 24px;
  font-weight: bold;
}
</style>
