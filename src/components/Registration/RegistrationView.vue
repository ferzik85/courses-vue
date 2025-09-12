<script setup lang="ts">
import ButtonView from "../../common/Button/ButtonView.vue";
import LabeledInputView from "../../common/LabeledInput/LabeledInputView.vue";
import {
  validateInput,
  validateEmail,
  validatePassword,
} from "../../utils/ValidateInput";
import { registerUserAsync } from "../../api/User/RegisterUser";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const nameIsInvalid = ref(false);
const emailIsInvalid = ref(false);
const passwordIsInvalid = ref(false);

const handleNameChange = (value: string) => {
  name.value = value;
  nameIsInvalid.value = false;
};

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
  const invalidName = !validateInput(name.value);
  const invalidEmail = !validateEmail(email.value);
  const invalidPassword = !validatePassword(password.value);
  emailIsInvalid.value = invalidName;
  emailIsInvalid.value = invalidEmail;
  passwordIsInvalid.value = invalidPassword;

  if (invalidName || invalidEmail || invalidPassword) return;

  const userIsRegistered = await registerUserAsync(
    name.value,
    email.value,
    password.value,
  );
  if (userIsRegistered) {
    router.push("/login");
  }
}
</script>

<template>
  <div class="reg">
    <b class="regHeader">Registration</b>
    <div class="regBody">
      <form class="regForm" @submit.prevent="handleSubmit">
        <LabeledInputView
          :name="'Name'"
          :value="name"
          :is-invalid="nameIsInvalid"
          :on-change="handleNameChange"
          :input-class-name="'regInput'"
        />
        <LabeledInputView
          :name="'Email'"
          :value="email"
          :is-invalid="emailIsInvalid"
          :on-change="handleEmailChange"
          :input-class-name="'regInput'"
        />
        <LabeledInputView
          :name="'Password'"
          :value="password"
          :is-invalid="passwordIsInvalid"
          :on-change="handlePasswordChange"
          :input-class-name="'regInput'"
        />
        <ButtonView
          :label="'REGISTER'"
          :type="'submit'"
          :class-name="'regButton'"
        ></ButtonView>
      </form>
      <div class="regHelp">
        If you have an account you may
        <RouterLink to="/login"><b>Login</b></RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reg {
  display: flex;
  flex-direction: column;
  margin-top: 0;
  background-color: #f7f7f7;
  flex-grow: 1;
}

.regHeader {
  margin: auto;
  margin-top: 100px;
  font-size: 32px;
  margin-bottom: 30px;
}

.regBody {
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

.regForm {
  margin: auto;
  width: 286px;
  margin-bottom: 0;
}

:deep(.regInput) {
  width: 266px;
}

.regButton {
  margin: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  height: 50px;
  width: 282px;
  font-size: 16px;
}

.regHelp {
  margin: auto;
  margin-top: 0px;
}
</style>
