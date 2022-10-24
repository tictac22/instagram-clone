<script lang="ts" setup>
import { useUserStore } from "@/utils/pinia"
import { onMounted } from "vue"
import Loader from "./components/loader.vue"
const { user, authenficate } = useUserStore()
onMounted(() => {
	authenficate()
})
</script>

<template>
	<Loader v-if="user.isAuthenticated === null" />
	<router-view v-else></router-view>
</template>
