import { userService } from "../../services"
import axios from "axios"

const state = {
	all: {},
	usersList: [],
	usersPerPage: [],
}

const actions = {
	getAll({ commit }) {
		commit("getAllRequest")

		userService.getAll().then(
			(users) => commit("getAllSuccess", users),
			(error) => commit("getAllFailure", error)
		)
	},
	getUsersList({ commit }) {
		axios
			.get("https://randomuser.me/api/?results=10")
			.then((response) => {
				commit("getUsersList", response.data.results)
			})
			.catch((err) => console.log(err))
	},
	getUsersPerPage({ commit }, data) {
		axios
			.get(
				`https://randomuser.me/api/?page=${data.page}&results=${data.perPage}`
			)
			.then((response) => {
				commit("getUsersPerPage", response.data.results)
			})
			.catch((err) => console.log(err))
	},
}

const mutations = {
	getAllRequest(state) {
		state.all = { loading: true }
	},
	getAllSuccess(state, users) {
		state.all = { items: users }
	},
	getAllFailure(state, error) {
		state.all = { error }
	},
	getUsersList(state, usersList) {
		state.usersList = usersList
	},
	getUsersPerPage(state, usersPerPage) {
		state.usersPerPage = usersPerPage
	},
}

export const users = {
	namespaced: true,
	state,
	actions,
	mutations,
}
