import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './components/Login/Login.vue'
import Registration from './components/Registration/Registration.vue'
import App from './components/App/App.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  { path: '/courses', component: App },
  { path: '/:pathMatch(.*)*', component: Login }, // catch-all
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router