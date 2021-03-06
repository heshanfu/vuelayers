import 'babel-polyfill'
import Vue from 'vue'
import VueLayers from '../src'
import App from './app.vue'

Vue.use(VueLayers)
console.log(VueLayers)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
})
