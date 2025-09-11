<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '../../common/Button/Button.vue';
import { userTokenIsSet } from '../../localStorage/StorageAccess';
import logo from '../../assets/epam-logo.svg';
import { useUserStore } from "../../stores/UserStore";
const tokenIsSet = userTokenIsSet();
const userStore = useUserStore();
const userName = userStore.userName;
const router = useRouter()
const logout = () => {
	userStore.logoutAsync().then(() => {
		router.push('/login')
	});
};
</script>

<template>
	<div class="header">
		<div class="logoWrapper">
			<img class="logo" :src="logo" alt="epam logo" />
		</div>
		<div class="title">COURSES</div>
		<div v-if="tokenIsSet" class="button">
			<span>{{ userName }}</span>
			<Button :label="'LOGOUT'" :onClick="logout"></Button>
		</div>
	</div>
</template>

<style scoped>
.header {
	margin: auto;
	display: flex;
	align-items: center;
	width: 1440px;
	height: 80px;
	background-color: white;
	margin-top: 0;
	margin-bottom: 0;
}

.logoWrapper {
	display: flex;
	margin-right: 10px;
	margin-left: 10px;
}

.title {
	color: black;
	margin-bottom: 10px;
	margin-left: 10px;
	margin-top: 7px;
	font-size: 24px;
	font-weight: bold;
}

.button {
	display: flex;
	margin-left: auto;
	margin-top: 10px;
	color: white;
	margin-right: 10px;
	align-items: center;
}

.button span {
	color: black;
	margin-right: 20px;
	font-size: 16px;
}

.logo {
	height: 40px;
}
</style>
