import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import Layout from './components/Layout/Layout.vue'
import { useAuthorStore } from './stores/AuthorStore'
import { useCourseStore } from './stores/CoursesStore'

const pinia = createPinia()
const application = createApp(Layout)
application.use(pinia)
application.use(router)
useAuthorStore().loadAuthorsAsync();
useCourseStore().loadCoursesAsync();

application.mount('#root')
