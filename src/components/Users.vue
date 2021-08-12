<template>
	<div class="text-center">
		<v-list>
			<v-list-item v-for="user in usersPerPage" :key="user.id.value">
				<v-list-item-content>
					<v-list-item-title v-text="user.name.first" />
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-pagination
			v-model="page"
			@input="changePage"
			:length="paginationLength"
			circle
		/>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex"
import router from "@/router/index.js"

export default {
	data() {
		return {
			defaultPage: 1,
			perPage: 4,
		}
	},
	computed: {
		...mapState({
			usersPerPage: (state) => state.users.usersPerPage,
			usersList: (state) => state.users.usersList,
		}),
		paginationLength() {
			return Math.ceil(this.usersList.length / this.perPage)
		},
		startPaginationIndex() {
			return 0 + this.perPage * (this.page - 1)
		},
		endPaginationIndex() {
			return this.startPaginationIndex + this.perPage
		},
		page: {
			get() {
				return this.$route.params.page
					? parseInt(this.$route.params.page)
					: this.defaultPage
			},
			set(newValue) {
				this.defaultPage = newValue
			},
		},
	},
	methods: {
		...mapActions("users", ["getUsersPerPage", "getUsersList"]),
		changePage() {
			if (this.$route.params.page != this.defaultPage) {
				console.log(this.$route.params.page, this.defaultPage)
				router.push({ name: "Users", params: { page: this.defaultPage } })
			}
		},
	},
	watch: {
		page() {
			this.getUsersPerPage({ page: this.page, perPage: this.perPage })
		},
	},
	mounted() {
		this.getUsersList()
		this.getUsersPerPage({ page: this.page, perPage: this.perPage })
	},
}
</script>
