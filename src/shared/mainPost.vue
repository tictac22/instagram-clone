<script setup lang="ts">
import ImageSlider from "@/components/post/imageSlider.vue"
import MainPostLikeCount from "@/components/post/mainPostLikeCount.vue"
import CommentForm from "@/components/post/modal/commentForm.vue"
import Comment from "@/components/post/modal/comments/comment.vue"
import CreatedComments from "@/components/post/modal/comments/createdComments.vue"
import { UserComment } from "@/components/post/modal/type"
import Animation from "@/components/post/postParts/like/animation.vue"
import LikeButton from "@/components/post/postParts/like/likeButton.vue"
import { hashtag, timeAgo } from "@/utils/helperFunctions"
import { useUserStore } from "@/utils/pinia"
import { Author, Comment as IComment, Post } from "@/utils/types"
import { useHead } from "@vueuse/head"
import { ref } from "vue"

const props = defineProps<{
	post: Post
	user: Author
	comments: IComment[]
}>()

useHead({
	title: `${props.user.userName} on Instagram: "${props.post.text}"`
})

const usersCreatedPosts = ref<UserComment[]>([])
const addcreatedPost = (data: UserComment) => {
	usersCreatedPosts.value.push({
		...data,
		photoUrl: data.photoUrl ?? "",
		createdAt: "Now"
	})
}

const animation = ref<HTMLDivElement | null>(null)
const mainPostLikeCountRef = ref<InstanceType<typeof MainPostLikeCount> | null>(
	null
)
const handleAnimation = () => {
	mainPostLikeCountRef.value!.updateLikeText()
	//@ts-ignore
	animation.value.handleLike()
}
const { handleLike: handleStoreLike } = useUserStore()
const handleLike = () => {
	mainPostLikeCountRef.value!.updateLikeText()
	handleStoreLike(props.post.id)
}
</script>

<template>
	<div
		class="relative flex h-full max-h-[1000px] w-full max-w-[1445px] items-center justify-center bg-black"
	>
		<div
			class="relative flex h-full flex-[60%] flex-col items-center justify-center"
			@dblclick="handleAnimation"
			@mousedown.prevent="() => {}"
		>
			<ImageSlider :images="props.post.images" :item-width="634" />
			<Animation :id="props.post.id" ref="animation" />
		</div>
		<div
			class="flex flex-[40%] flex-col justify-between self-stretch bg-white"
		>
			<div
				class="flex items-center border-b border-solid border-gray-400 p-4"
			>
				<img
					class="h-8 w-8 rounded-full"
					:src="props.user.photoUrl ?? '/default.jpg'"
				/>
				<RouterLink :to="`/${props.user.uid}`">
					<p class="ml-5 font-medium hover:underline">
						{{ props.user.userName }}
					</p>
				</RouterLink>
			</div>
			<div class="flex-1 p-4">
				<div class="flex items-start">
					<img
						class="h-8 w-8 rounded-full"
						:src="props.user.photoUrl ?? '/default.jpg'"
					/>
					<div class="ml-5 inline">
						<RouterLink
							:to="`/p/${props.user.uid}`"
							class="font-medium hover:underline"
						>
							{{ props.user.userName }}
						</RouterLink>

						<p
							class="ml-1 inline"
							v-html="hashtag(props.post.text)"
						></p>
					</div>
				</div>
				<CreatedComments :users-created-posts="usersCreatedPosts" />
				<Comment
					v-for="comment in props.comments"
					:key="comment.id"
					v-bind="comment"
				/>
			</div>
			<div class="border-t border-solid border-gray-500 p-4">
				<div class="flex items-center py-2">
					<LikeButton :id="props.post.id" @handle-like="handleLike" />
					<RouterLink :to="`/p/${props.post.id}`">
						<font-awesome-icon
							icon="fa-solid fa-comment"
							class="mx-2 mr-auto h-6 w-6 cursor-pointer stroke-black stroke-[39px] text-white transition-opacity hover:opacity-60"
						/>
					</RouterLink>
				</div>
				<MainPostLikeCount
					:id="post.id"
					ref="mainPostLikeCountRef"
					:likes="post.likes"
				/>
				<p class="text-xs">
					{{ timeAgo(props.post.createdAt.seconds) }}
				</p>
			</div>
			<CommentForm
				:id="props.post.id"
				:addcreated-post="addcreatedPost"
			/>
		</div>
	</div>
</template>
