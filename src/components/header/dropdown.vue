<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const expanded = ref(false)

const collapseMenu = () => (expanded.value = false)
const openMenu = () => (expanded.value = true)

const { logOut, user } = useUserStore()
const route = useRoute()
const router = useRouter()
const logOutHandler = async () => {
	await logOut()
	router.push("/")
}
</script>

<template>
	<div v-click-outside="collapseMenu" class="relative ml-6">
		<div
			id="click"
			class="relative flex cursor-pointer items-center justify-center rounded-full"
			tabindex="0"
			@click="openMenu"
			@keydown.enter="openMenu"
		>
			<div
				v-if="route.params.id === user.data.uid"
				class="absolute h-[28px] w-[28px] rounded-full border border-solid border-black"
			/>
			<img
				alt="default"
				:src="user.data.photoUrl ? user.data.photoUrl : '/default.jpg'"
				class="h-6 w-6 select-none rounded-full"
			/>
		</div>
		<div
			class="absolute -right-[10px] top-[40px] z-[1] w-[192px] rounded bg-white p-2 drop-shadow transition-all"
			:data-test="expanded"
			:class="[
				expanded
					? 'opacity-1 pointer-events-auto visible translate-y-0'
					: 'pointer-events-none invisible -translate-y-3 opacity-0'
			]"
		>
			<div class="triangle -top-[13px] right-[11px]" />
			<RouterLink
				:to="`/${user.data.uid}`"
				class="block cursor-pointer px-4 py-2 transition-colors hover:bg-gray-200"
				tabindex="0"
			>
				Profile
			</RouterLink>
			<p
				class="cursor-pointer px-4 py-2 transition-colors hover:bg-gray-200"
				tabindex="0"
				@click="logOutHandler"
				@keydown.enter="logOutHandler"
			>
				Log Out
			</p>
		</div>
	</div>
</template>
