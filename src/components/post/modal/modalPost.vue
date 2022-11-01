<script setup lang="ts">
import ModalPostOverlay from "@/layouts/modalPostOverlay.vue"
import MainPost from "@/shared/mainPost.vue"
import { getPost } from "@/utils/firebase"
import { handlePadingToWindow } from "@/utils/helperFunctions"
import { EventWithKeycode } from "@/utils/types"
import { onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
const router = useRouter()
const route = useRoute()

const data = await getPost(route.params.id as string)

const closePopup = (e: Event) => {
	if ((e as EventWithKeycode).keyCode === 27) {
		router.back()
	}
}
onMounted(() => {
	handlePadingToWindow("hide")
	window.addEventListener("keydown", closePopup)
})
onUnmounted(() => {
	handlePadingToWindow("show")
	window.removeEventListener("keydown", closePopup)
})
</script>

<template>
	<ModalPostOverlay>
		<MainPost :post="data.post" :user="data.user" />
	</ModalPostOverlay>
</template>
