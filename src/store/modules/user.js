import { userService } from "../../services"
import router from "@/router/index.js"
import routeNames from "../../router/routeNames"

/* const user = JSON.parse(localStorage.getItem("user")) */
/* const state = user
	? { status: { loggedIn: true }, user }
	: { status: {}, user: null } */
const state = {
	status: {},
	user: null,
}

const actions = {
	login({ commit }, { username, password }) {
		commit("loginRequest", { username })

		userService.login(username, password).then(
			(user) => {
				commit("loginSuccess", user)
				router.push({ name: routeNames.home })
			},
			(error) => {
				commit("loginFailure", error)
			}
		)
	},
	logout({ commit }) {
		userService.logout()
		commit("logout")
	},
	register(ctx, user) {
		userService.register(user).then(
			(response) => {
				console.log(response.status)
			},
			(error) => {
				console.log(error)
			}
		)
	},
	setUserFromLS({ commit }, user) {
		commit("setUserFromLS", user)
	},
}

const mutations = {
	loginRequest(state, user) {
		state.status = { loggingIn: true }
		state.user = user
	},
	loginSuccess(state, user) {
		state.status = { loggedIn: true }
		state.user = user
	},
	loginFailure(state) {
		state.status = {}
		state.user = null
	},
	logout(state) {
		state.status = {}
		state.user = null
	},
	setUserFromLS(state, user) {
		state.user = user
		state.status = { loggedIn: true }
	},
}

export const account = {
	namespaced: true,
	state,
	actions,
	mutations,
}
