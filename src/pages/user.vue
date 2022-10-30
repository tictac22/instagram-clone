<script setup lang="ts">
import Follow from "@/components/follow.vue"
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"
import SquarePost from "@/shared/squarePost.vue"
import { getUserPage, getUserPosts } from "@/utils/firebase"
import { nFormatter } from "@/utils/helperFunctions"
import { Author, Post } from "@/utils/types"
import { onMounted, reactive, ref, watch } from "vue"
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

const subscribeCount = ref<HTMLDivElement | null>(null)
const updateSubscribeValue = (subscribe: boolean) => {
	const text = parseInt(subscribeCount.value!.innerHTML)
	if (subscribe) {
		subscribeCount.value!.innerHTML = `${text + 1}`
		return
	}
	subscribeCount.value!.innerHTML = `${text - 1}`
}
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
						<Follow
							v-if="data.user"
							:id="data.user.uid"
							@update-count="updateSubscribeValue"
						/>
					</div>
					<div class="my-[20px] flex items-center">
						<p>
							<span class="font-medium">{{
								nFormatter(data.user.postsNumber)
							}}</span>
							Posts
						</p>
						<p class="ml-[40px]">
							<span ref="subscribeCount" class="font-medium">{{
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
				<div class="mb-10 grid w-[935px] grid-cols-3 gap-[28px]">
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
