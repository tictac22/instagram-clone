<script setup lang="ts">
//@ts-ignore
import { useUserStore } from "@/utils/pinia"
import { ref } from "vue"
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
	likes: number
	createdAt: {
		seconds: number
	}
	comments: number
}>()

// /@\S+/gm

const animation = ref<HTMLDivElement | null>(null)
const handleAnimation = () => {
	postBottomRef.value!.updateLikeText()
	//@ts-ignore
	animation.value.handleLike()
}

const postBottomRef = ref<InstanceType<typeof PostBottom> | null>(null)
const { handleLike: handleStoreLike } = useUserStore()
const handleLike = () => {
	postBottomRef.value!.updateLikeText()
	handleStoreLike(props.id)
}
</script>
<template>
	<div
		class="mb-4 w-full rounded-lg border border-solid border-[#DBDBDB] bg-white"
	>
		<div class="flex items-center px-3 py-2">
			<RouterLink :to="`/${props.uid}`">
				<img
					:src="props.author.photoUrl"
					alt="default"
					class="h-8 w-8 rounded-full"
				/>
			</RouterLink>
			<RouterLink
				:to="`/${props.uid}`"
				class="mr-auto ml-2 hover:underline"
				>{{ props.author.fullName }}</RouterLink
			>
		</div>
		<div class="relative" @dblclick="handleAnimation">
			<ImageSlider v-once :images="props.images" :item-width="468" />
			<Animation :id="props.id" ref="animation" />
		</div>
		<div class="flex items-center px-3 py-2">
			<LikeButton :id="props.id" @handle-like="handleLike" />
			<RouterLink
				:to="{ name: 'PostChildren', params: { id: props.id } }"
			>
				<font-awesome-icon
					icon="fa-solid fa-comment"
					class="mx-2 mr-auto h-6 w-6 cursor-pointer stroke-black stroke-[39px] text-white transition-opacity hover:opacity-60"
				/>
			</RouterLink>
		</div>
		<PostBottom
			v-once
			:id="props.id"
			ref="postBottomRef"
			:full-name="props.author.fullName"
			:created-at="props.createdAt.seconds"
			:text="props.text"
			:likes="props.likes"
			:comments="props.comments"
		/>
	</div>
</template>
