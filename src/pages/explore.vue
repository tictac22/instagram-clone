<script setup lang="ts">
import ExplorepostWrapper from "@/components/post/explorepostWrapper.vue"
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"
</script>

<template>
	<PageWrapper>
		<ModalPostLoader />
		<Suspense>
			<ExplorepostWrapper />
			<template #fallback> ...loading i</template>
		</Suspense>
	</PageWrapper>
</template>
