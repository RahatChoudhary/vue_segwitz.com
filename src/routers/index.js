import VueRouter from 'vue-router';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Blog from '../components/Blog';
import Cookie from "js-cookie";
import Vue from 'vue';

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'login',
        component: Login,
		meta: {
			public: true,  // Allow access to even if not logged in
			onlyWhenLoggedOut: true,
			title: 'Login | Segwitz'
        }
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
		meta: { title: 'Dashboard | Segwitz' }
    }, {
        path: '/blog',
        name: 'blog',
        component: Blog,
		meta: { title: 'Blog | Segwitz' }
    }]
});

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public)
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
	let loggedIn = false;
	let res = Cookie.get('token_id');
	if(res) loggedIn = true;
	if (!isPublic && !loggedIn) {
		return next({
			path: '/',
			query: { redirect: to.fullPath }  // Store the full path to redirect the user to after login
		});
	}
	// Do not allow user to visit login page or register page if they are logged in
	if (loggedIn && onlyWhenLoggedOut) {
		return next('/dashboard');
	}
	next();
});

router.afterEach((to) => {
	Vue.nextTick(() => {
		document.title = to.meta.title || 'Segwitz';
	});
});
export default router;