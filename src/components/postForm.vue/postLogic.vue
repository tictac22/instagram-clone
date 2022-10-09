<script setup lang="ts">
import { defineAsyncComponent, inject } from "vue"
import { key } from "./context/key"
// import Cropping from "./cropping/cropping.vue"
// import Description from "./description/description.vue"
import DragFile from "./dragFile.vue"
// import Filter from "./filter/filter.vue"

const AsyncCropping = defineAsyncComponent(
	() => import("./cropping/cropping.vue")
)
const AsyncFilter = defineAsyncComponent(() => import("./filter/filter.vue"))
const AsyncDescription = defineAsyncComponent(
	() => import("./description/description.vue")
)
const { formStep } = inject(key)!
</script>

<template>
	<DragFile v-if="formStep === 0" />
	<AsyncCropping v-if="formStep === 1" />
	<AsyncFilter v-if="formStep === 2" />
	<AsyncDescription v-if="formStep === 3" />
</template>
