<script setup lang="ts">
import "cropperjs/dist/cropper.css"
import { defineAsyncComponent, reactive, ref } from "vue"
import drag from "../../assets/drag.svg"
import IsLoading from "../isLoading.vue"
const VueCropper = defineAsyncComponent(() => import("vue-cropperjs"))
interface InputFileEvent extends Event {
	target: HTMLInputElement
}

interface State {
	open: boolean
	file: string | ArrayBuffer | null | undefined
	loading: boolean
}
/**
 * <VueCropper
								:src="state.file"
								:viewMode="3"
								:autoCropArea="1"
								:center="false"
							/>
 * 
 */
const input = ref<HTMLInputElement | null>(null)
const state = reactive<State>({
	loading: false,
	open: false,
	file: ""
})

const handlePopup = () => {
	state.open = !state.open
}
const onPickFile = () => {
	input.value!.click()
}

const handleFile = (event: Event) => {
	const file = (event as InputFileEvent).target.files![0]
	console.log(file)
	const reader = new FileReader()
	reader.readAsDataURL(file)
	reader.onload = (event) => {
		state.file = event.target?.result
	}
}
</script>

<template>
	<font-awesome-icon
		icon="fa-solid fa-square-plus"
		class="w-6 h-6 ml-6 text-white stroke-black stroke-[30px]"
		@click.stop="handlePopup"
	/>
	<Teleport to="body">
		<div
			:class="[
				state.open
					? 'visible pointer-events-auto opacity-100 scale-100'
					: 'invisble pointer-events-none opacity-0 scale-125'
			]"
			class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center transition-all"
		>
			<font-awesome-icon
				icon="fa-solid fa-xmark"
				class="text-white absolute top-2 right-2 w-5 h-5"
			/>
			<div
				class="bg-white scale-100 rounded h-[calc(100vmin-229px)] w-[calc(100vmin-229px)] max-h-[900px] max-w-[900px]"
				v-click-outside="handlePopup"
			>
				<div
					class="flex items-center justify-center m-auto py-2 border-b border-[#DBDBDB]"
				>
					<h3 class="font-medium">Create new post</h3>
				</div>
				<div class="bg-white h-full flex justify-center">
					<div
						v-if="!state.file"
						class="flex items-center justify-center flex-col"
					>
						<img :src="drag" />
						<p class="text-xl font-light text-[rgb(38,38,38)]">
							Drag photos and videos here
						</p>
						<button
							class="bg-blue-500 text-white p-1 px-2 rounded mt-3"
							v-on:click="onPickFile"
						>
							Select from computer
						</button>
						<input
							ref="input"
							type="file"
							class="hidden"
							v-on:change="handleFile"
							accept=".jpg,.jpeg,.png"
						/>
					</div>
					<template v-else>
						<Suspense>
							<VueCropper
								:src="state.file"
								:viewMode="3"
								:autoCropArea="1"
								:center="false"
								class="h-full"
							/>
							<template #fallback>
								<div class="flex items-center">
									<IsLoading />
								</div>
							</template>
						</Suspense>
					</template>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped></style>
