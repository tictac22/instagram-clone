<script setup lang="ts">
import PageWrapper from "@/layouts/pageWrapper.vue"
import MainPost from "@/shared/mainPost.vue"
import SquarePost from "@/shared/squarePost.vue"
import { getPost } from "@/utils/firebase"
import { Author, Comment as IComment, Post } from "@/utils/types"
import { onMounted, reactive, watch } from "vue"
import { useRoute } from "vue-router"

const state = reactive({
	loading: true,
	data: {} as { post: Post; user: Author; morePosts: Post[] },
	comments: [] as IComment[]
})
const route = useRoute()

const getData = async () => {
	const data = await getPost(route.params.id as string, true)
	Object.assign(state, {
		data,
		loading: false
	})
}
watch(
	() => route.params.id,
	() => {
		getData()
		window.scrollTo(0, 0)
	}
)
onMounted(() => {
	getData()
})
</script>

<template>
	<PageWrapper>
		<MainPost
			v-if="!state.loading"
			:post="state.data.post"
			:user="state.data.user"
		/>
		<template v-if="state.data?.morePosts">
			<div class="mt-7 h-[1px] w-full bg-gray-200" />
			<p class="mt-5 font-bold text-gray-300">
				More post from
				<RouterLink
					:to="`/${state.data.user.uid}`"
					class="text-black hover:underline"
				>
					{{ state.data.post.authorUserName }}
				</RouterLink>
			</p>
			<div class="my-5 grid w-[935px] grid-cols-3 gap-[28px]">
				<SquarePost
					v-for="post in state.data.morePosts"
					:key="post.id"
					:post="post"
					:to="'Post'"
				/>
			</div>
		</template>
	</PageWrapper>
</template>
