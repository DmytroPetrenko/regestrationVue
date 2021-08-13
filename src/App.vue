<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
import { mapActions } from "vuex"
export default {
	name: "App",
	methods: {
		...mapActions("user", ["setUserFromLS"]),
	},
	created() {
		const user = JSON.parse(localStorage.getItem("user"))
		if (user) {
			this.setUserFromLS(user)
		}
	},
}
</script>
