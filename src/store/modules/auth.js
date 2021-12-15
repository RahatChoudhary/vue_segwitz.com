import Cookie from "js-cookie";
import router from "../../routers";

var timeout;
export default {
	state: {
		overlay: false,
	},
	mutations: {
		overlay(state, val){
			state.overlay = val;
		}
	},
	actions: {
		logout ({ commit }) {
			commit('overlay', true);
			Cookie.remove('token_id');
			Cookie.remove('token');
			Cookie.remove('token_expiry_time');
			if(timeout){
				clearTimeout(timeout);
			}
			router.push("/");
			commit('overlay', false);
		},
		saveTokenInCookies ({ dispatch }, token) {
			var expireTimeInMS =  3600 * 1000;
			Cookie.set('token_id', token, {
				expires: new Date(new Date().getTime() + expireTimeInMS)
			});
			Cookie.set('token', token);
			Cookie.set('token_expiry_time', new Date(new Date().getTime() + expireTimeInMS), {
				expires: new Date(new Date().getTime() + expireTimeInMS)
			});
			dispatch('autoLogOut');
		},

		autoLogOut ({ dispatch }) {
			if(Cookie.get('token_id')){
				var milliseconds = Math.abs(new Date().getTime() - new Date(Cookie.get('token_expiry_time')));
				if(timeout){
					clearTimeout(timeout);
				}
				timeout = setTimeout(function(){ 
					dispatch('logout'); 
				}, milliseconds);
			}
		}
	},
	getters: {
		overlay(state){
			return state.overlay;
		}
	},
	modules: {
	},
	strict: false
}