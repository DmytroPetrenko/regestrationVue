<template>
	<div>
		<h1>Hi {{ user.user.firstname }}!</h1>
		<p>You're logged in with Vue + Vuex & JWT!!</p>
		<h3>Users from secure api end point:</h3>
		<em v-if="users.loading">Loading users...</em>
		<span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
		<ul v-if="users.items">
			<li v-for="user in users.items" :key="user.id">
				{{ user.firstName + " " + user.lastName }}
			</li>
		</ul>
		<p @click="logout">
			<router-link to="/login">Logout</router-link>
		</p>
	</div>
</template>
<script>
import { mapState, mapActions } from "vuex"

export default {
	name: "UserPage",

	computed: {
		...mapState({
			user: (state) => state.user,
			users: (state) => state.users.all,
		}),
	},
	created() {
		this.getAllUsers()
	},
	methods: {
		...mapActions("users", {
			getAllUsers: "getAll",
		}),
		...mapActions("user", {
			logout: "logout",
		}),
	},
}
</script>
