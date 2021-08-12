import Vue from "vue"
import Router from "vue-router"
import RegestrationForm from "@/components/RegestrationForm"
import UserPage from "@/components/UserPage"
import routeNames from "./routeNames"

Vue.use(Router)

let router = new Router({
	routes: [
		{
			path: "/login",
			name: routeNames.login,
			component: RegestrationForm,
		},
		{
			path: "/",
			name: routeNames.home,
			component: UserPage,
		},
		{
			path: "/page-not-found",
			alias: "*",
			component: { render: (h) => h("div", ["404! Page Not Found!"]) },
		},
	],
})

router.beforeEach((to, from, next) => {
	// redirect to login page if not logged in and trying to access a restricted page
	const publicPages = [routeNames.login]
	const authRequired = !publicPages.includes(to.name)
	const loggedIn = localStorage.getItem("user")

	if (authRequired && !loggedIn) {
		return next(routeNames.login)
	}

	next()
})

export default router
