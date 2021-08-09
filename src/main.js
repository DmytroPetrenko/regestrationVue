import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import RegestrationForm from "@/components/RegestrationForm"
import UserPage from "@/components/UserPage"

Vue.use(VueRouter)

const routes = [
	{
		path: "",
		component: RegestrationForm,
	},
	{
		path: "/user",
		component: UserPage,
	},
]

const router = new VueRouter({
	routes,
	mode: "history",
})

Vue.config.productionTip = false

new Vue({
	store,
	router,
	vuetify,
	render: (h) => h(App),
}).$mount("#app")
