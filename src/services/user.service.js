export const userService = {
	login,
	logout,
	register,
	getAll,
}
const path = "https://registrationform.free.beeceptor.com"
//const path = ""

function login(username, password) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	}

	return fetch(`${path}/login`, requestOptions)
		.then(handleResponse)
		.then((user) => {
			// login successful if there's a jwt token in the response
			if (user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem("user", JSON.stringify(user))
			}

			return user
		})
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("user")
}

function register(user) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	}

	return fetch(`${path}/register`, requestOptions).then(handleResponse)
}

function getAll() {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	}

	return fetch(`${path}/users`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			if (response.status === 401) {
				// auto logout if 401 response returned from api
				logout()
				location.reload(true)
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		if (data.users) {
			return data.users
		}

		return data
	})
}

function authHeader() {
	// return authorization header with jwt token
	let user = JSON.parse(localStorage.getItem("user"))

	if (user && user.token) {
		return { Authorization: "Bearer " + user.token }
	} else {
		return {}
	}
}
