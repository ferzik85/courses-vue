import { createApp } from 'vue'
import { createPinia } from 'pinia'
//import router from './router'
import App from './App.vue'
import './style.css'
import { useAuthorStore } from './stores/AuthorStore'
import { useCourseStore } from './stores/CoursesStore'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
//app.use(router)
useAuthorStore().loadAuthorsAsync();
useCourseStore().loadCoursesAsync();

app.mount('#app')
