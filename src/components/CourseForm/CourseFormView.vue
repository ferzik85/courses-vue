<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthorStore } from "../../stores/AuthorStore";
import type { Author } from "../../stores/AuthorStore";
import { useCoursesStore } from "../../stores/CoursesStore";
import ButtonView from "../../common/Button/ButtonView.vue";
import LabeledInputView from "../../common/LabeledInput/LabeledInputView.vue";
import ButtonInputView from "../../common/ButtonInput/ButtonInputView.vue";
import DurationInputView from "../../common/DurationInput/DurationInputView.vue";
import { validateInput } from "../../utils/ValidateInput";
import validateDuration from "../../utils/ValidateDuration";
import AuthorItemView from "./components/AuthorItem/AuthorItemView.vue";
const router = useRouter();
const route = useRoute();
const coursesStore = useCoursesStore();
const authorStore = useAuthorStore();
const formId = "courseCreateOrEditForm";
const courseId = computed(() => route.params.courseId as string | undefined);
const isAddForm = computed(() => !courseId.value);
const authors = authorStore.getAuthors;
const courseToEdit = computed(() =>
  courseId.value ? coursesStore.getCourse(courseId.value) : null
);
const title = ref(courseToEdit.value?.title ?? "");
const description = ref(courseToEdit.value?.description ?? "");
const duration = ref(courseToEdit.value?.duration ?? "");
const titleIsInvalid = ref(false);
const descriptionIsInvalid = ref(false);
const durationIsInvalid = ref(false);
const courseAuthorIds = ref(courseToEdit.value?.authors ?? []);
const courseAuthors = authors.filter((author) =>
  courseAuthorIds.value.includes(author.id),
);
const getCurrentDate = () =>
  new Date().toJSON().slice(0, 10).split("-").reverse().join("/");
const validateInputForCourseForm = (value: string) =>
  validateInput(value) && value.length > 1;
const courseAuthorListIsEmpty = courseAuthorIds.value.length === 0;

const handleTitleChange = (value: string) => {
  title.value = value;
  titleIsInvalid.value = false;
};

const handleDescriptionChange = (value: string) => {
  description.value = value;
  descriptionIsInvalid.value = false;
};

const handleDurationChange = (value: string) => {
  duration.value = value;
  durationIsInvalid.value = false;
};

const handleAddAuthorToCourse = (e: Event, authorId: string) => {
  e.preventDefault();
  const authorWithTheSameIdAlreadyExists =
    courseAuthorIds.value.find(
      (courseAuthorId) => courseAuthorId === authorId,
    ) != null;
  if (authorWithTheSameIdAlreadyExists) return;
  const authorToAdd = authors.find((author: Author) => author.id === authorId);
  if (authorToAdd) {
    courseAuthorIds.value = [...courseAuthorIds.value, authorToAdd.id];
  }
};

const handleRemoveAuthorFromCourse = (e: Event | null, authorId: string) => {
  e?.preventDefault();
  courseAuthorIds.value = [
    ...courseAuthorIds.value.filter(
      (courseAuthorId) => courseAuthorId !== authorId,
    ),
  ];
};

const handleCreateAuthor = (name: string) => {
  authorStore.addAuthorAsync(name);
};

const handleDeleteAuthor = async (e: Event, authorId: string) => {
  e.preventDefault();
  await authorStore.deleteAuthorAsync(authorId);
  handleRemoveAuthorFromCourse(null, authorId);
};

function handleSubmitCourse(e: Event) {
  e.preventDefault();
  const invalidTitle = !validateInputForCourseForm(title.value);
  const invalidDescription = !validateInputForCourseForm(description.value);
  const invalidDuration = !validateDuration(duration.value);
  titleIsInvalid.value = invalidTitle;
  descriptionIsInvalid.value = invalidDescription;
  durationIsInvalid.value = !validateDuration(duration.value);
  if (invalidTitle || invalidDescription || invalidDuration) {
    title.value = "";
    description.value = "";
    return;
  }
  const course = {
    id: "",
    title: title.value,
    description: description.value,
    creationDate: getCurrentDate(),
    duration: +duration.value,
    authors: [...courseAuthorIds.value],
  };
  if (isAddForm.value) {
    coursesStore.addCourseAsync(course);
  } else {
    coursesStore.updateCourseAsync({
      ...course,
      id: courseId.value as string,
    });
  }
  router.push("/courses");
}
// missing style on create author button!
</script>

<template>
  <div class="courseForm">
    <h3 class="courseFormHeader">
      {{ isAddForm ? "Create Course" : "Edit Course" }}
    </h3>
    <div class="courseFormBody">
      <form
        :id="formId"
        class="submitForm"
        @onSubmit.prevent="handleSubmitCourse"
      >
        <p class="courseFormMain">Main Info</p>
        <LabeledInputView
          :name="'Title'"
          :value="title"
          :is-invalid="titleIsInvalid"
          :on-change="handleTitleChange"
          :input-class-name="'courseFormTitle'"
        />
        <LabeledInputView
          :name="'Description'"
          :value="description"
          :is-invalid="descriptionIsInvalid"
          :on-change="handleDescriptionChange"
          :input-class-name="'courseFormDescription'"
          :is-text-area="true"
        />
        <p class="courseFormMain">Duration</p>
        <DurationInputView
          name="Duration"
          :duration="+duration"
          :is-invalid="durationIsInvalid"
          :on-change="handleDurationChange"
          :input-class-name="'courseFormDuration'"
        />
        <div class="createAuthorsPanel">
          <div class="addAuthorsPanel">
            <p class="courseFormMain">Authors</p>
            <ButtonInputView
              :label-name="'Author Name'"
              :button-name="'CREATE AUTHOR'"
              :on-click="handleCreateAuthor"
              :validate-input="validateInputForCourseForm"
            />
            <p class="courseFormMain">Authors List</p>

            <AuthorItemView
              v-for="author in authors"
              :id="author.id"
              :key="author.id"
              :name="author.name"
              :on-add-click="(e) => handleAddAuthorToCourse(e, author.id)"
              :on-delete-click="(e) => handleDeleteAuthor(e, author.id)"
            />
          </div>
          <div class="courseAuthorsPanel">
            <p class="courseAuthorsPanelTitle">Course Authors</p>
            <p
              v-if="courseAuthorListIsEmpty"
              class="courseAuthorsPanelEmptyList"
            >
              Author list is empty
            </p>
            <template v-else>
              <AuthorItemView
                v-for="author in courseAuthors"
                :id="author.id"
                :key="author.id"
                :name="author.name"
                :on-delete-click="
                  (e) => handleRemoveAuthorFromCourse(e, author.id)
                "
                :add-is-disabled="true"
                :author-item-class="'courseListItem'"
              />
            </template>
          </div>
        </div>
      </form>
    </div>
    <div class="courseFormFooter">
      <ButtonView
        :label="'CREATE COURSE'"
        :type="'submit'"
        :form-name="formId"
        :class-name="'createButton'"
      />
      <RouterLink to="/courses">
        <ButtonView :label="'CANCEL'" :class-name="'cancelButton'" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.courseForm {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
}

.courseFormHeader {
  margin: auto;
  margin-top: 20px;
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 700;
  width: 1104px;
}

.courseFormBody {
  width: 1104px;
  min-height: 825px;
  display: flex;
  margin: auto;
  background-color: white;
  flex-direction: column;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  font-size: 16px;
}

.courseFormMain {
  font-size: 24px;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 20px;
}

.submitForm {
  margin: auto;
  width: 944px;
  margin-top: 0;
}

:deep(.courseFormTitle) {
  width: 944px;
}

:deep(.courseFormDescription) {
  height: 100px;
  resize: none;
  padding-top: 15px;
  width: 944px;
}

:deep(.courseFormDuration, .courseFormAuthor) {
  width: 400px;
}

.createAuthorsPanel {
  margin: auto;
  display: flex;
  width: 1050px;
}

.addAuthorsPanel {
  width: 650px;
}

.courseAuthorsPanel {
  width: 270px;
  margin-left: 100px;
}

.courseAuthorsPanelTitle {
  text-align: center;
  margin: auto;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.courseAuthorsPanelEmptyList {
  text-align: center;
  margin-bottom: 20px;
}

:deep(.courseListItem) {
  justify-content: center;
}

.courseListAuthor {
  max-width: 200px;
}

.courseFormFooter {
  margin: auto;
  margin-top: 20px;
  width: 1104px;
}

:deep(.createButton, .cancelButton) {
  height: 50px;
  font-size: 16px;
  float: right;
}

:deep(.createButton) {
  margin-left: 15px;
}
</style>
