<script setup lang="ts">
import { UserComment } from "../type"
import Comment from "./comment.vue"

const props = defineProps<{
	usersCreatedPosts: UserComment[]
}>()
</script>

<template>
	<div>
		<Comment
			v-for="comment in props.usersCreatedPosts"
			:key="comment.text"
			v-bind="comment"
		>
		</Comment>
	</div>
</template>
