import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { getCoursesApiAsync } from "../api/Courses/GetCourses";
import { addCourseApiAsync } from "../api/Courses/AddCourse";
import { deleteCourseApiAsync } from "../api/Courses/DeleteCourse";
import { updateCourseApiAsync } from "../api/Courses/UpdateCourse";
import { userTokenIsSet, getUserToken } from "../localStorage/StorageAccess";
import { useAuthorStore } from "./AuthorStore";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export const useCoursesStore = defineStore("coursesStore", () => {
  const authorStore = useAuthorStore();
  const courses = ref([] as Course[]);
  const getCourses = computed(() => courses.value);

  const getCoursesWithAuthorNames = computed(() => {
    const authors = authorStore.getAuthors;
    return courses.value.map((course) => ({
      ...course,
      authors: course.authors.map(
        (authorId) =>
          authors.find((author) => author.id === authorId)?.name ??
          "Unknown author",
      ),
    }));
  });

  const getCourseWithAuthorName = (courseId: string) => {
    return (
      getCoursesWithAuthorNames.value.find(
        (course) => course.id === courseId,
      ) ?? null
    );
  };

  const getCourse = (courseId: string) => {
    return getCourses.value.find((course) => course.id === courseId) ?? null;
  };

  async function loadCoursesAsync() {
    const result = await getCoursesApiAsync();
    if (result.ok) {
      courses.value = result.courses;
    }
  }

  async function addCourseAsync(course: Course) {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const result = await addCourseApiAsync(token, course);
      if (result.ok && result.course) {
        courses.value.push(result.course);
      }
    }
  }

  async function deleteCourseAsync(id: string) {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const ok = await deleteCourseApiAsync(token, id);
      if (ok) {
        courses.value = courses.value.filter((course) => course.id !== id);
      }
    }
  }

  async function updateCourseAsync(course: Course) {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const result = await updateCourseApiAsync(token, course);
      if (result.ok && result.course) {
        courses.value = courses.value.map((oldCourse) =>
          oldCourse.id === course.id ? course : oldCourse,
        );
      }
    }
  }

  return {
    getCourses,
    getCoursesWithAuthorNames,
    getCourseWithAuthorName,
    getCourse,
    loadCoursesAsync,
    addCourseAsync,
    deleteCourseAsync,
    updateCourseAsync,
  };
});
