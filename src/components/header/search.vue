<script setup lang="ts">
import { suggestUser } from "@/utils/firebase"
import { debounce, parsedSuggestedUsersFromLC } from "@/utils/helperFunctions"
import { Author } from "@/utils/types"
import { computed, reactive, watch } from "vue"
import { RouterLink } from "vue-router"
import Spinner from "../loaders/spinner.vue"
const state = reactive({
	isExpanded: false,
	isLoading: false,
	searchInput: "",
	historysuggestedUsers: parsedSuggestedUsersFromLC(),
	suggestedUsers: [] as Author[],
	noFound: false
})
const filteredSuggestedUsers = computed(() =>
	state.suggestedUsers.length > 0 && state.searchInput
		? state.suggestedUsers
		: state.historysuggestedUsers
)
watch(
	() => state.searchInput,
	() => {
		state.noFound = false
		state.isLoading = true
	}
)
watch(
	() => state.searchInput,
	debounce(async value => {
		if (!value.trim()) {
			state.isLoading = false
			state.suggestedUsers = []
			return
		}
		const users = await suggestUser(value)
		if (users.length === 0) {
			state.noFound = true
		}
		state.suggestedUsers = users
		state.isLoading = false
	}, 500)
)
const expandContainer = () => (state.isExpanded = true)
const collapseContainer = () => (state.isExpanded = false)
const addToRecentSearches = (user: Author) => {
	state.isExpanded = false
	state.searchInput = ""
	const userStorage = parsedSuggestedUsersFromLC()
	if (userStorage.find(item => item.uid === user.uid)) return
	if (userStorage.length === 10) {
		userStorage[9] = { ...user }
	} else {
		userStorage.push({ ...user })
	}
	state.historysuggestedUsers = userStorage
	window.localStorage.setItem("searchedUsers", JSON.stringify(userStorage))
}
const deleteHistory = () => {
	state.historysuggestedUsers = []
	window.localStorage.removeItem("searchedUsers")
}
</script>

<template>
	<div v-click-outside="collapseContainer" class="relative h-9">
		<div
			class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
		>
			<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
		</div>
		<input
			v-model="state.searchInput"
			placeholder="Search"
			class="h-full min-w-[268px] rounded-lg bg-[#efefef] px-3 pl-7 outline-none"
			@focus="expandContainer"
		/>
		<div
			v-if="state.isExpanded"
			class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
			@click="collapseContainer"
		>
			<font-awesome-icon icon="fa-solid fa-circle-xmark" />
		</div>

		<div
			class="absolute top-[50px] z-10 h-[375px] w-[375px] -translate-x-12 rounded-lg bg-white drop-shadow transition-all"
			:class="[
				state.isExpanded
					? 'opacity-1 pointer-events-auto visible translate-y-0'
					: 'pointer-events-none invisible -translate-y-3 opacity-0'
			]"
		>
			<div class="triangle -top-[13px] left-1/2 -translate-x-1/2" />
			<div class="relative flex h-full flex-col overflow-y-scroll">
				<div class="flex items-center justify-between p-3">
					<h4 class="font-bold">Recent</h4>
					<p
						id="deleteButton"
						class="cursor-pointer text-blue-300"
						@click="deleteHistory"
					>
						clear all
					</p>
				</div>
				<template v-if="!state.isLoading && !state.noFound">
					<RouterLink
						v-for="user in filteredSuggestedUsers"
						:key="user.uid"
						:to="user.uid"
						:data-test="user.uid"
						class="flex w-full cursor-pointer items-center pl-3 hover:bg-[rgb(250,250,250)]"
						@click="addToRecentSearches(user)"
					>
						<img
							class="h-8 w-8 rounded-full"
							:src="user.photoUrl ?? '/default.jpg'"
						/>
						<div class="ml-3">
							<p class="font-semibold">{{ user.userName }}</p>
							<p class="font-medium text-gray-200">
								{{ user.fullName }}
							</p>
						</div>
					</RouterLink>
				</template>
				<div
					class="flex flex-auto items-center self-center text-gray-400"
				>
					<p v-if="state.noFound">No any founds</p>
					<p
						v-else-if="
							state.historysuggestedUsers.length === 0 &&
							state.suggestedUsers.length === 0 &&
							!state.isLoading
						"
					>
						No recent searches.
					</p>
					<Spinner v-if="state.isLoading" />
				</div>
			</div>
		</div>
	</div>
</template>
