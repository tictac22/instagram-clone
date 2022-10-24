<script setup lang="ts">
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"
import SquarePost from "@/shared/squarePost.vue"
import { getUserPage, getUserPosts } from "@/utils/firebase"
import { nFormatter } from "@/utils/helperFunctions"
import { useUserStore } from "@/utils/pinia"
import { Author, Post } from "@/utils/types"
import { onMounted, reactive, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const data = reactive<{ user: Author; posts: Post[] }>({
	user: {} as Author,
	posts: {} as Post[]
})
const getData = async () => {
	const user = await getUserPage(route.params.id as string)
	const posts = await getUserPosts(route.params.id as string)
	Object.assign(data, {
		user,
		posts
	})
}
watch(
	() => route.params.id,
	() => {
		getData()
	}
)
onMounted(async () => {
	getData()
})
const {
	user: { data: userData }
} = useUserStore()
</script>

<template>
	<PageWrapper>
		<ModalPostLoader />
		<div v-if="Object.keys(data.user ?? {}).length > 0">
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
							v-if="userData.uid !== route.params.id"
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
					<SquarePost
						v-for="post in data.posts"
						:key="post.id"
						:post="post"
						:to="'UserPost'"
					/>
				</div>
			</div>
		</div>
	</PageWrapper>
</template>
