<script></script>

<template>
	<RouterView v-slot="{ Component }">
		<Suspense timeout="0">
			<template v-if="Component">
				<component :is="Component" />
			</template>

			<template #fallback>
				<div
					class="fixed top-0 left-0 z-30 flex h-full w-full items-center justify-center p-[30px]"
					name="test"
				>
					<div
						class="absolute inset-0 cursor-pointer bg-black bg-opacity-60"
						tabindex="0"
						role="button"
					/>
					<div
						class="relative flex h-full max-h-[1000px] w-full max-w-[1445px] items-center justify-center bg-white"
					>
						<div
							class="h-full flex-[60%] animate-pulse bg-slate-200"
						/>
						<div
							class="flex h-full flex-[40%] flex-col justify-between bg-white"
						>
							<div
								class="flex items-center border-b border-solid border-gray-200 p-4 pb-2"
							>
								<div
									class="h-11 w-11 animate-pulse rounded-full bg-slate-200"
								/>
								<div class="ml-2">
									<div
										class="mb-1 h-2 w-20 animate-pulse bg-slate-200"
									/>
									<div
										class="h-2 w-16 animate-pulse bg-slate-200"
									/>
								</div>
							</div>
							<div
								class="flex flex-col items-start border-t border-solid border-gray-200 p-4 pb-16"
							>
								<div
									class="mb-3 h-4 w-32 animate-pulse bg-slate-200"
								/>
								<div
									class="mb-3 h-4 w-28 animate-pulse bg-slate-200"
								/>
								<div
									class="h-4 w-24 animate-pulse bg-slate-200"
								/>
							</div>
						</div>
					</div>
				</div>
			</template>
		</Suspense>
	</RouterView>
</template>
