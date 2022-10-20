<script setup lang="ts">
import ModalHome from "@/components/post/modal/modalHome.vue"
import PageWrapper from "@/components/tools/pageWrapper.vue"
import { getUserPage, getUserPosts } from "@/utils/firebase"
import { nFormatter } from "@/utils/helperFunctions"
import { Author, Post } from "@/utils/types"
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import Carousel from "../assets/carousel.vue"
const route = useRoute()
const data = reactive<{ user: Author; posts: Post[] }>({
	user: {} as Author,
	posts: {} as Post[]
})
onMounted(async () => {
	const user = await getUserPage(route.params.id as string)
	const posts = await getUserPosts(route.params.id as string)
	Object.assign(data, {
		user,
		posts
	})
})
</script>

<template>
	<PageWrapper>
		<ModalHome />
		<div v-if="Object.keys(data.user).length > 0">
			<div class="flex">
				<div class="mr-[30px] grow">
					<img
						class="m-auto h-[150px] w-[150px] rounded-full"
						:src="data.user.photoUrl ?? '/default.jpg'"
					/>
				</div>
				<div class="grow-[2]">
					<div class="flex items-center">
						<h2 class="text-lg">
							{{ data.user.userName }}
						</h2>
						<button
							class="ml-6 rounded bg-blue-500 py-1 px-6 text-white"
						>
							Follow
						</button>
					</div>
					<div class="my-[20px] flex items-center">
						<p>
							<span class="font-medium">{{
								nFormatter(data.user.postsNumber)
							}}</span>
							Posts
						</p>
						<p class="ml-[40px]">
							<span class="font-medium">{{
								nFormatter(data.user.followers)
							}}</span>
							followers
						</p>
					</div>
					<p class="font-medium">
						{{ data.user.fullName }}
					</p>
				</div>
			</div>
			<div>
				<div
					class="my-5 h-[1px] w-full rounded border border-solid border-gray-100"
				/>
				<div class="grid w-[935px] grid-cols-3 gap-[28px]">
					<div
						v-for="post in data.posts"
						:key="post.id"
						class="group relative h-[293px] cursor-pointer"
					>
						<RouterLink
							:to="{ name: 'UserPost', params: { id: post.id } }"
						>
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
							<img
								:src="post.images[0]"
								class="h-full w-full object-cover"
							/>
						</RouterLink>
					</div>
				</div>
			</div>
		</div>
	</PageWrapper>
</template>
