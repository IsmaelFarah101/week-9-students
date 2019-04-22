import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import StudentAPIService from '../services/StudentServices.js'

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.prototype.$student_api = StudentAPIService

new Vue({
  render: h => h(App),
}).$mount('#app')
