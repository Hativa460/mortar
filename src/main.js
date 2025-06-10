import Vue from 'vue'
import App from './App.vue'
import store from './store'

import 'animate.css';
import VueDraggable from 'vue-draggable'
 
Vue.use(VueDraggable)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
