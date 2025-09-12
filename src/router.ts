import { createMemoryHistory, createRouter } from "vue-router";

import LoginView from "./components/Login/LoginView.vue";
import RegistrationView from "./components/Registration/RegistrationView.vue";
import AppView from "./components/App/AppView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/login", component: LoginView },
  { path: "/registration", component: RegistrationView },
  { path: "/courses", component: AppView },
  { path: "/:pathMatch(.*)*", component: LoginView }, // catch-all
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
