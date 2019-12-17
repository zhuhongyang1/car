// 引入reset.css消除浏览器样式差异
import './reset.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
import 'lib-flexible/flexible.js'
import './directives'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/error.jpg'),
  loading: require('./assets/timg.gif'),
  attempt: 1
})

import { ImagePreview } from 'vant';
Vue.use(ImagePreview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
