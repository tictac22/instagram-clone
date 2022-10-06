<script setup lang="ts">
import { inject } from "vue"
import { key } from "./context/key"
import Cropping from "./cropping/cropping.vue"
import DragFile from "./cropping/dragFile.vue"
import FilterContext from "./filter/filterContext.vue"

const { formStep } = inject(key)!
</script>

<template>
	<DragFile v-if="formStep === 0" />
	<Cropping v-show="formStep === 1" />
	<FilterContext v-if="formStep === 2" />
</template>
