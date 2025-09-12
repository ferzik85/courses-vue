import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import LayoutView from "./components/Layout/LayoutView.vue";
import { useAuthorStore } from "./stores/AuthorStore";
import { useCourseStore } from "./stores/CoursesStore";

const pinia = createPinia();
const application = createApp(LayoutView);
application.use(pinia);
application.use(router);
useAuthorStore().loadAuthorsAsync();
useCourseStore().loadCoursesAsync();

application.mount("#root");
