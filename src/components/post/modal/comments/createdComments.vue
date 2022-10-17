<script setup lang="ts">
import { UserComment } from "../type"

const props = defineProps<{
	usersCreatedPosts: UserComment[]
}>()
</script>

<template>
	<div>
		<div
			v-for="comment in props.usersCreatedPosts"
			:key="comment.text"
			class="mt-3 flex"
		>
			<img
				class="h-[32px] w-[32px] rounded-full"
				:src="comment.photoUrl ?? '/default.jpg'"
			/>
			<div class="ml-5 inline">
				<div>
					<p class="inline font-medium">
						{{ comment.userName }}
					</p>
					<p class="ml-1 inline break-all">
						dasssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
						adssssssssssssssssssssssssssssssssssss
					</p>
					<p class="text-xs text-gray-200">{{ comment.createdAt }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
