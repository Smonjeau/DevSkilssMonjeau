import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/index.js'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to) => {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {

    // if store is not filled then get backup from localStorage
    if (!store.state.filled)
        store.commit('initialiseStore')

    // if token doesnt exist but user is "logged" then log out
    if (localStorage.getItem('token') === null && store.getters.isLoggedIn) {
        store.commit('logout')
    }

    if (store.state.disciplines === undefined) {
        store.commit('refreshDisciplines')
    }

    if (to.matched.some(record => record.meta.alreadyLogged)) {
        if (store.getters.isLoggedIn) {
            next({ path: '/' })
        }
    }

    // view requires to be authenticated
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.isLoggedIn) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            // view requires to have an upper level role
            if (to.matched.some(record => record.meta.requiresUpperLevel)) {
                if (store.getters.isAdmin() || store.getters.isModerator()) {
                    next()
                } else {
                    next({name: 'Forbidden'})
                }
            }
            next()
        }
    } else {
        next()
    }
    next();
})


export default router
