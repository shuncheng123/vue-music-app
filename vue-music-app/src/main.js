import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
// import './registerServiceWorker'

import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'

Vue.config.productionTip = false// ???

Vue.use(VueLazyload,{
  // loading: '../public/img/default.png',
  // loaded: '../public/img/default.png'
})

// FastClick.attach(document.body);

// 适配Rem
var clientWidth  = document.documentElement.clientWidth;
document.documentElement.style.fontSize = (clientWidth / 750) * 100 + 'px';

new Vue({
  router,
  store,
  render: h => h(App)// ???
}).$mount('#app')// ???
