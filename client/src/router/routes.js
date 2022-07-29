import Home from '../views/Home.vue'

export default [

    {
        path: '/index.html',
        redirect: "/",
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },



]