<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import ExplorepostWrapper from "@/components/post/wrappers/explorepostWrapper.vue"
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"

import { useHead } from "@vueuse/head"
useHead({
	title: "Explore"
})
</script>

<template>
	<PageWrapper>
		<ModalPostLoader />
		<Suspense>
			<ExplorepostWrapper />
			<template #fallback> <Spinner /> </template>
		</Suspense>
	</PageWrapper>
</template>
