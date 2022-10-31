<script setup lang="ts">
import Spinner from "@/components/loaders/spinner.vue"
import UserPostWrapper from "@/components/post/wrappers/userPostWrapper.vue"
import UserPageInfo from "@/components/user/userPageInfo.vue"
import PageWrapper from "@/layouts/pageWrapper.vue"
import ModalPostLoader from "@/shared/modalPostLoader.vue"
</script>

<template>
	<PageWrapper>
		<ModalPostLoader />
		<div>
			<Suspense>
				<UserPageInfo />
				<template #fallback><Spinner /></template>
			</Suspense>
			<div>
				<div
					class="my-5 h-[1px] w-full rounded border border-solid border-gray-100"
				/>
				<Suspense>
					<UserPostWrapper />
					<template #fallback><div></div> </template>
				</Suspense>
			</div>
		</div>
	</PageWrapper>
</template>
