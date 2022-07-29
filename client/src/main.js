import App from './App.vue'
import Vue from 'vue'
import router from "@/router";
import {store} from "@/store";
import vuetify from './plugins/vuetify'
import './plugins/axios'



export const eventBus = new Vue();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),


}).$mount('#app')