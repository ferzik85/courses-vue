import { createWebHistory, createRouter } from "vue-router";
import LoginView from "./components/Login/LoginView.vue";
import RegistrationView from "./components/Registration/RegistrationView.vue";
import AppView from "./components/App/AppView.vue";
import CoursesView from "./components/Courses/CoursesView.vue";
import CourseInfoView from "./components/CourseInfo/CourseInfoView.vue";
import CourseFormView from "./components/CourseForm/CourseFormView.vue";
import { useUserStore } from "./stores/UserStore";

const routes = [
  { path: "/", component: LoginView },
  { path: "/login", component: LoginView },
  { path: "/registration", component: RegistrationView },
  {
    path: "/courses",
    component: AppView,
    children: [
      {
        path: "",
        name: "courses",
        component: CoursesView,
      },
      {
        path: "add",
        name: "course-add",
        component: CourseFormView,
        meta: { requiresAdmin: true },
      },
      {
        path: "update/:id",
        name: "course-update",
        component: CourseFormView,
        props: true,
        meta: { requiresAdmin: true },
      },
      {
        path: ":id",
        name: "course-info",
        component: CourseInfoView,
        props: true,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: LoginView }, // catch-all
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAdmin) {
    const userStore = useUserStore();
    if (!userStore.isAdmin) return next("/login");
  }
  next();
});

export default router;
