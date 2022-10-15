<script setup lang="ts">
//@ts-ignore
import ImageSlider from "./imageSlider.vue"
import Animation from "./postParts/like/animation.vue"
import LikeButton from "./postParts/like/likeButton.vue"
import PostBottom from "./postParts/postBottom.vue"

type Author = {
	uid: string
	fullName: string
	photoUrl: string
	userName: string
}
const props = defineProps<{
	text: string
	id: string
	uid: string
	images: string[]
	author: Author
	createdAt: {
		seconds: number
	}
}>()

// /@\S+/gm
</script>
<template>
	<div
		class="mb-4 w-full rounded-lg border border-solid border-[#DBDBDB] bg-white"
	>
		<div class="flex items-center px-3 py-2">
			<img
				:src="props.author.photoUrl"
				alt="default"
				class="h-8 w-8 rounded-full"
			/>
			<p class="mr-auto ml-2">{{ props.author.fullName }}</p>
		</div>
		<div class="relative">
			<ImageSlider v-once :images="props.images" />
			<Animation :id="props.id" />
		</div>
		<div class="flex items-center px-3 py-2">
			<LikeButton :id="props.id" />
			<font-awesome-icon
				icon="fa-solid fa-comment"
				class="mx-2 mr-auto h-6 w-6 cursor-pointer stroke-black stroke-[39px] text-white transition-opacity hover:opacity-60"
			/>
			<font-awesome-icon
				icon="fa-solid fa-bookmark"
				class="h-6 w-6 stroke-black stroke-[39px] text-white"
			/>
		</div>
		<PostBottom
			v-once
			:id="props.id"
			:full-name="props.author.fullName"
			:created-at="props.createdAt.seconds"
			:text="props.text"
		/>
	</div>
</template>
