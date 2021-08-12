import axios from "axios"

export const userService = {
	login,
	logout,
	register,
	getAll,
}
const path = "https://registrationform.free.beeceptor.com"

function login(username, password) {
	return axios
		.post(`${path}/login`, {
			body: JSON.stringify({ username, password }),
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data))
			}

			return response.data
		})
		.catch((err) => console.log(err))
}

function logout() {
	localStorage.removeItem("user")
}

function register(user) {
	return axios
		.post(`${path}/register`, {
			body: JSON.stringify(user),
		})
		.then((response) => {
			return response.data
		})
		.catch((err) => console.log(err))
}

function getAll() {
	return axios
		.get(`${path}/users`)
		.then((response) => {
			return response.data.users
		})
		.catch((err) => console.log(err))
}
