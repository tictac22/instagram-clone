<script setup lang="ts">
import { inject } from "vue"
import { key } from "./context/key"
import Cropping from "./cropping/cropping.vue"
import Description from "./description/description.vue"
import DragFile from "./dragFile.vue"
import Filter from "./filter/filter.vue"

const { formStep } = inject(key)!
</script>

<template>
	<DragFile v-if="formStep === 0" />
	<Cropping v-if="formStep === 1" />
	<Filter v-if="formStep === 2" />
	<Description v-if="formStep === 3" />
</template>
