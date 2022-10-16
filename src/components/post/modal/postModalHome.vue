<script setup lang="ts">
import { createCommentPost, getPost, getPostComments } from "@/utils/firebase"
import { handlePadingToWindow, timeAgo } from "@/utils/helperFunctions"
import { EventWithKeycode } from "@/utils/types"
import { onMounted, onUnmounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import ImageSlider from "../imageSlider.vue"
import Animation from "../postParts/like/animation.vue"
import LikeButton from "../postParts/like/likeButton.vue"
import CommentForm from "./commentForm.vue"

const router = useRouter()
const route = useRoute()

const data = await getPost(route.params.id as string)
const comments = await getPostComments(route.params.id as string)
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
	<Teleport to="#modal">
		<div
			class="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center p-[30px]"
		>
			<div
				class="absolute inset-0 cursor-pointer bg-black bg-opacity-60"
				tabindex="0"
				role="button"
				@click="router.back()"
			></div>
			<div
				class="relative flex h-full max-h-[1000px] w-full max-w-[1445px] items-center justify-center bg-black"
			>
				<div
					class="relative flex h-full flex-[60%] flex-col items-center justify-center"
				>
					<ImageSlider :images="data.post.images" :item-width="634" />
					<Animation :id="data.post.id" />
				</div>
				<div
					class="flex h-full flex-[40%] flex-col justify-between bg-white"
				>
					<div
						class="flex items-center border-b border-solid border-gray-400 p-4"
					>
						<img
							class="h-8 w-8 rounded-full"
							:src="data.user.photoUrl ?? '/default.jpg'"
						/>
						<RouterLink :to="`/p/${data.user.uid}`">
							<p class="ml-5 font-medium hover:underline">
								{{ data.user.userName }}
							</p>
						</RouterLink>
					</div>
					<div class="flex-1 p-4">
						<div class="flex items-start">
							<img
								class="h-8 w-8 rounded-full"
								:src="data.user.photoUrl ?? '/default.jpg'"
							/>
							<div class="ml-5 inline">
								<RouterLink
									:to="`/p/${data.user.uid}`"
									class="font-medium hover:underline"
								>
									{{ data.user.userName }}
								</RouterLink>

								<p class="inline">
									Lorem ipsum dolor sit amet, consectetur
									adipisicing elit. Itaque inventore nisi
									obcaecati sequi facere id fuga, enim ipsum
									mollitia fugit rerum aut labore iste ullam
									est animi cum eius dolore.
								</p>
							</div>
						</div>
						<div @click="createCommentPost(data.post.id)">test</div>
					</div>
					<div class="border-t border-solid border-gray-500 p-4">
						<div class="flex items-center py-2">
							<LikeButton :id="data.post.id" />
							<RouterLink :to="`/p/${data.post.id}`">
								<font-awesome-icon
									icon="fa-solid fa-comment"
									class="mx-2 mr-auto h-6 w-6 cursor-pointer stroke-black stroke-[39px] text-white transition-opacity hover:opacity-60"
								/>
							</RouterLink>
						</div>
						<p class="text-xs">
							{{ timeAgo(data.post.createdAt.seconds) }}
						</p>
					</div>
					<CommentForm />
				</div>
			</div>
		</div>
	</Teleport>
</template>
