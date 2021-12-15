<template>
	<div>
		<v-app id="inspire">
			<v-main>
				<v-container fluid fill-height>
					<v-layout align-center justify-center>
						<v-flex xs12 sm8 md4>
							<v-card class="elevation-12">
								<v-toolbar dark color="#1e1e2d">
									<v-toolbar-title>Login Form</v-toolbar-title>
								</v-toolbar>
								<v-card-text>
									<v-form>
										<v-text-field
											v-model="accessCode"
											prepend-icon="mdi-account"
											label="Username"
											name="username"
											type="text"
											dense
											outlined
											color="#0000FF"
											hide-details
											class="pb-5"
										/>
										<v-text-field
											v-model="verifyCode"
											prepend-icon="mdi-lock"
											label="Password"
											name="password"
											type="password"
											dense
											outlined
											color="#0000FF"
											hide-details
											v-on:keyup.enter="login"
										/>
									</v-form>
								</v-card-text>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn color="#1e1e2d" dark @click="login">Login</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-app>
	</div>		
</template>

<script>
	import router from "../routers";
	
	export default {
		data: () => ({
			accessCode: null,
			verifyCode: null
		}),
		methods: {
			login() {
				if(!this.accessCode){
					alert('Username Is Required');
					return;
				}
				if(!this.verifyCode){
					alert('Password Is Required');
					return;
				}
				this.$store.commit('overlay', true);
				if(this.accessCode == 'admin' || this.verifyCode == 'admin'){
					this.$store.dispatch('saveTokenInCookies', 'jlkasdjflkjasdf_asfasdf54565131');
					router.push("/dashboard");
				}else{
					alert('Username or Password does not match')
				}
				this.$store.commit('overlay', false);
			}
		}
	};
</script>