<script setup lang="ts">
import ButtonView from "../../common/Button/ButtonView.vue";
import LabeledInputView from "../../common/LabeledInput/LabeledInputView.vue";
import { validateEmail, validatePassword } from "../../utils/ValidateInput";
import {
  putUser as addUserToLocalStorage,
  userTokenIsSet,
  getUser,
} from "../../localStorage/StorageAccess";
import { loginUserAsync } from "../../api/User/LoginUser";
import { getMeAsync } from "../../api/User/GetMe";
import { useUserStore } from "../../stores/UserStore";
import type { User } from "../../stores/UserStore";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const emailIsInvalid = ref(false);
const passwordIsInvalid = ref(false);

const navigateToCourses = (useRedirect: boolean) => {
  router.push({ path: "/courses", replace: useRedirect });
};
const saveUserToStore = (user: User) => userStore.login(user);

onMounted(() => {
  if (userTokenIsSet()) {
    const user = getUser();
    saveUserToStore({
      isAuth: true,
      name: user.name,
      email: user.email,
      token: user.token,
      role: user.role,
    });
    navigateToCourses(true);
  }
});

const handleEmailChange = (value: string) => {
  email.value = value;
  emailIsInvalid.value = false;
};

const handlePasswordChange = (value: string) => {
  password.value = value;
  passwordIsInvalid.value = false;
};

async function handleSubmit(e: Event) {
  e.preventDefault();
  const invalidEmail = !validateEmail(email.value);
  const invalidPassword = !validatePassword(password.value);
  emailIsInvalid.value = invalidEmail;
  passwordIsInvalid.value = invalidPassword;
  if (invalidEmail || invalidPassword) return;
  const userIsLoggedResponse = await loginUserAsync(
    email.value,
    password.value,
  );
  if (userIsLoggedResponse.ok) {
    const me = await getMeAsync(userIsLoggedResponse.user!.token);
    if (me.ok) {
      const user = { ...userIsLoggedResponse.user!, role: me.role! };
      addUserToLocalStorage(user);
      const storeUser: User = { ...getUser(), isAuth: true };
      saveUserToStore(storeUser);
      navigateToCourses(false);
    }
  }
}
</script>

<template>
  <div class="login">
    <b class="loginHeader">Login</b>
    <div class="loginBody">
      <form class="loginForm" @submit.prevent="handleSubmit">
        <LabeledInputView
          name="Email"
          :value="email"
          :is-invalid="emailIsInvalid"
          :input-class-name="'loginInput'"
          @change="handleEmailChange"
        />
        <LabeledInputView
          name="Password"
          :value="password"
          :is-invalid="passwordIsInvalid"
          :input-class-name="'loginInput'"
          @change="handlePasswordChange"
        />
        <ButtonView
          :label="'LOGIN'"
          :type="'submit'"
          :class-name="'loginButton'"
        ></ButtonView>
      </form>
      <div class="loginHelp">
        If you don&apos;t have an account you may
        <RouterLink to="/registration"><b>Register</b></RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  margin-top: 0;
  background-color: #f7f7f7;
  flex-grow: 1;
}

.loginHeader {
  margin: auto;
  margin-top: 100px;
  font-size: 32px;
  margin-bottom: 30px;
}

.loginBody {
  width: 585px;
  height: 558px;
  display: flex;
  margin: auto;
  margin-top: 0px;
  background-color: white;
  flex-direction: column;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  font-size: 16px;
}

.loginForm {
  margin: auto;
  width: 286px;
  margin-bottom: 0;
}

:deep(.loginInput) {
  width: 266px;
}

.loginButton {
  margin: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  height: 50px;
  width: 284px;
  font-size: 16px;
}

.loginHelp {
  margin: auto;
  margin-top: 0px;
}
</style>
