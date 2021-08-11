import Vue from "vue"
import Router from "vue-router"
import RegestrationForm from "@/components/RegestrationForm"
import UserPage from "@/components/UserPage"

Vue.use(Router)

let router = new Router({
	mode: "history",
	routes: [
		{
			path: "/login",
			component: RegestrationForm,
		},
		{
			path: "/",
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
	const publicPages = ["/login"]
	const authRequired = !publicPages.includes(to.path)
	const loggedIn = localStorage.getItem("user")

	if (authRequired && !loggedIn) {
		return next("/login")
	}

	next()
})

export default router
