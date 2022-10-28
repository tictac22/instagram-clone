<script setup lang="ts">
import SquarePost from "@/shared/squarePost.vue"
import { getExplorePosts } from "@/utils/firebase"
const data = await getExplorePosts()
</script>

<template>
	<div class="grid w-[935px] grid-cols-3 gap-[28px]">
		<SquarePost
			v-for="post in data"
			:key="post.id"
			:post="post"
			:to="'ExplorePost'"
		/>
	</div>
</template>
