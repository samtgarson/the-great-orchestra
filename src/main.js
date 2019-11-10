import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  // require('dom-console')()
}


window.$vm = new Vue({
  router,
  store,
  render: h => h(App),
})
  
window.$vm.$mount('#app')
