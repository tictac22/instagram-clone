<script setup lang="ts">
import Carousel from "@/assets/carousel.vue"
import { nFormatter } from "@/utils/helperFunctions"
import { Post } from "@/utils/types"
//eslint-disable-next-line
const { post, to } = defineProps<{
	post: Post
	to: "Post" | "UserPost"
}>()
</script>

<template>
	<div class="group relative h-[293px] cursor-pointer">
		<RouterLink :to="{ name: to, params: { id: post.id } }">
			<div
				class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100"
			>
				<p class="">
					<font-awesome-icon
						icon="fa-solid fa-heart "
						class="mr-2"
					/>{{ nFormatter(post.likes) }}
				</p>
				<p class="ml-2">
					<font-awesome-icon
						class="mr-2"
						icon="fa-solid fa-comment"
					/>{{ nFormatter(post.comments) }}
				</p>
			</div>
			<Carousel
				v-if="post.images.length > 1"
				class="absolute right-2 top-2"
			/>
			<img :src="post.images[0]" class="h-full w-full object-cover" />
		</RouterLink>
	</div>
</template>
