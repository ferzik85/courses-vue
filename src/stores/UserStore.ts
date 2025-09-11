import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { logoutUserAsync } from "../api/User/LogoutUser";
import {
  removeActiveUserFromLocalStorage,
  userTokenIsSet,
  getUserToken,
} from "../localStorage/StorageAccess";

export interface User {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  role: string;
}

const defaultUser: User = {
  isAuth: false,
  name: "",
  email: "",
  token: "",
  role: "",
};

export const useUserStore = defineStore("userStore", () => {
  const user = ref(defaultUser);
  const userName = computed(() => user.value.name);
  const isAdmin = computed(() => user.value.role?.toLowerCase() === "admin");

  function login(u: User) {
    user.value = { ...u, isAuth: true };
  }

  async function logoutAsync() {
    if (userTokenIsSet()) {
      const token = getUserToken();
      const ok = await logoutUserAsync(token);
      if (ok) {
        removeActiveUserFromLocalStorage();
        user.value = defaultUser;
      }
    }
  }

  return { user, userName, isAdmin, login, logoutAsync };
});
