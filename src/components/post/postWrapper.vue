<script setup lang="ts">
import { getUserHomePosts } from "@/utils/firebase"
import { useUserStore } from "@/utils/pinia"
import Post from "./post.vue"
const { user } = useUserStore()
const posts = await getUserHomePosts(user.data.subscribed)
</script>

<template>
	<Post v-for="post in posts" :key="post.id" v-bind="{ ...post }" />
</template>
