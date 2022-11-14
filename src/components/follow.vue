<script setup lang="ts">
import { useUserStore } from "@/utils/pinia"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const props = defineProps<{
	id: string
}>()
const emits = defineEmits<{
	(e: "updateCount", update: boolean): void
}>()
const { user, handleSubscribe } = useUserStore()

const isSubscribed = computed(
	() => user && user.data?.subscribed.find(item => item === props.id)
)
const subscribe = () => {
	emits("updateCount", !isSubscribed.value)
	handleSubscribe(props.id)
}
</script>

<template>
	<template v-if="user.data.uid !== route.params.id">
		<button
			v-if="!isSubscribed"
			id="follow"
			class="ml-6 rounded bg-blue-500 py-1 px-6 text-white"
			@click="subscribe"
		>
			Follow
		</button>
		<button
			v-else
			id="unfollow"
			class="ml-6 rounded bg-gray-500 py-1 px-6 text-white"
			@click="subscribe"
		>
			Unfollow
		</button>
	</template>
</template>
