import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import './assets/app.scss'
import 'jquery'
import $ from 'jquery'
import 'popper.js'
import 'bootstrap'
import routes from './routes'
import {fb} from './firebase'
import VueFirestore from 'vue-firestore'
import VueCarousel from 'vue-carousel'
import Vue2Filters from 'vue2-filters'
import Swal from 'sweetalert2'
window.Swal = Swal;
require('firebase/firestore')

Vue.use(Vuex)
import store from './store.js'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
});

window.Toast = Toast;

Vue.use(VueRouter)

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

Vue.use(VueFirestore)

Vue.use(VueCarousel)

Vue.use(Vue2Filters)

window.$ = $;

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

let app = '';

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      render: h => h(App),
      router,
      store
    }).$mount('#app')
    
  }
});

Vue.config.productionTip = false