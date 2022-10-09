<script setup lang="ts">
//@ts-ignore
import EmojiPicker from "vue3-emoji-picker"
import "../../../node_modules/vue3-emoji-picker/dist/style.css"

const props = defineProps<{
	setEmoji: (emoji: { i: string }) => string
}>()
</script>

<template>
	<EmojiPicker :native="true" @select="props.setEmoji" />
</template>
