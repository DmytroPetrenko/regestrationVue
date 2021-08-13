<template>
	<v-dialog v-model="isDialog" persistent max-width="600px" min-width="360px">
		<div>
			<v-tabs
				v-model="tab"
				show-arrows
				background-color="deep-purple accent-4"
				icons-and-text
				dark
				grow
			>
				<v-tabs-slider color="purple darken-4" />
				<v-tab v-for="i in tabs" :key="i.id">
					<v-icon large>{{ i.icon }}</v-icon>
					<div class="caption py-1">{{ i.name }}</div>
				</v-tab>
				<v-tab-item>
					<v-card class="px-4">
						<v-card-text>
							<v-form ref="loginForm" v-model="valid" lazy-validation>
								<v-row>
									<v-col cols="12">
										<v-text-field
											v-model="loginEmail"
											:rules="loginEmailRules"
											label="E-mail"
											required
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-model="loginPassword"
											:append-icon="isPassVisible ? 'eye' : 'eye-off'"
											:rules="[rules.required, rules.min]"
											:type="isPassVisible ? 'text' : 'password'"
											name="input-10-1"
											label="Password"
											hint="At least 8 characters"
											counter
											@click:append="changeShowIcon"
										/>
									</v-col>
									<v-col class="d-flex" cols="12" sm="6" xsm="12" />
									<v-spacer />
									<v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
										<v-btn
											x-large
											block
											:disabled="!valid"
											color="success"
											@click="validateLogin"
										>
											Login
										</v-btn>
									</v-col>
								</v-row>
							</v-form>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card class="px-4">
						<v-card-text>
							<v-form ref="registerForm" v-model="valid" lazy-validation>
								<v-row>
									<v-col cols="12" sm="6" md="6">
										<v-text-field
											v-model="firstName"
											:rules="[rules.required]"
											label="First Name"
											maxlength="20"
											required
										/>
									</v-col>
									<v-col cols="12" sm="6" md="6">
										<v-text-field
											v-model="lastName"
											:rules="[rules.required]"
											label="Last Name"
											maxlength="20"
											required
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-model="email"
											:rules="emailRules"
											label="E-mail"
											required
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											v-model="password"
											:append-icon="isPassVisible ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[rules.required, rules.min]"
											:type="isPassVisible ? 'text' : 'password'"
											name="input-10-1"
											label="Password"
											hint="At least 8 characters"
											counter
											@click:append="changeShowIcon"
										/>
									</v-col>
									<v-col cols="12">
										<v-text-field
											block
											v-model="verify"
											:append-icon="isPassVisible ? 'mdi-eye' : 'mdi-eye-off'"
											:rules="[rules.required, passwordMatch]"
											:type="isPassVisible ? 'text' : 'password'"
											name="input-10-1"
											label="Confirm Password"
											counter
											@click:append="changeShowIcon"
										/>
									</v-col>
									<v-spacer />
									<v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
										<v-btn
											x-large
											block
											:disabled="!valid"
											color="success"
											@click="validateRegister"
											>Register</v-btn
										>
									</v-col>
								</v-row>
							</v-form>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs>
		</div>
	</v-dialog>
</template>

<script>
import { mapActions } from "vuex"
import { v4 as uuidv4 } from "uuid"

export default {
	name: "RegestrationForm",

	computed: {
		passwordMatch() {
			return () => this.password === this.verify || "Password must match"
		},
	},
	methods: {
		...mapActions("user", ["register", "login"]),
		validateRegister() {
			if (this.$refs.registerForm.validate()) {
				// submit form to server/API here...
				this.register({
					name: this.firstName + " " + this.lastName,
					email: this.email,
					password: this.password,
				})
				this.tab = 0
			}
		},
		validateLogin() {
			if (this.$refs.loginForm.validate()) {
				// submit form to server/API here...

				this.login({ username: this.email, password: this.password })
			}
		},
		reset() {
			this.$refs.form?.reset()
		},
		resetValidation() {
			this.$refs.form?.resetValidation()
		},
		changeShowIcon() {
			this.isPassVisible = !this.isPassVisible
		},
	},
	data: () => ({
		isDialog: true,
		tab: 0,
		tabs: [
			{ id: uuidv4(), name: "Login", icon: "mdi-account" },
			{ id: uuidv4(), name: "Register", icon: "mdi-account-outline" },
		],
		valid: true,

		firstName: "",
		lastName: "",
		email: "",
		password: "",
		verify: "",
		loginPassword: "",
		loginEmail: "",
		loginEmailRules: [
			(v) => !!v || "Required",
			(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
		],
		emailRules: [
			(v) => !!v || "Required",
			(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
		],

		isPassVisible: false,
		rules: {
			required: (value) => !!value || "Required.",
			min: (v) => (v && v.length >= 8) || "Min 8 characters",
		},
	}),
}
</script>
