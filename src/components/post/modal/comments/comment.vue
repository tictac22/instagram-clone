<script setup lang="ts">
import { timeAgo } from "@/utils/helperFunctions"
import { computed } from "vue"

const props = defineProps<{
	userId: string
	photoUrl: string
	text: string
	userName: string
	createdAt:
		| {
				seconds: number
		  }
		| string
}>()
const createdAt = computed(() =>
	typeof props.createdAt === "string"
		? props.createdAt
		: timeAgo(props.createdAt.seconds)
)
</script>

<template>
	<div class="mt-3 flex">
		<img
			class="h-[32px] w-[32px] rounded-full"
			:src="props.photoUrl ?? '/default.jpg'"
		/>
		<div class="ml-5 inline">
			<div>
				<RouterLink
					:to="props.userId"
					class="font-medium hover:underline"
				>
					{{ props.userName }}
				</RouterLink>
				<p class="ml-1 inline break-all">
					{{ props.text }}
				</p>
				<p class="text-xs text-gray-200">
					{{ createdAt }}
				</p>
			</div>
		</div>
	</div>
</template>
