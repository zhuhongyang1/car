// 引入reset.css消除浏览器样式差异
import './reset.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
// 引入 lib-flexible 移动端rem适配插件
import 'lib-flexible/flexible.js'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/error.jpg'),
  loading: require('./assets/timg.gif'),
  attempt: 1
})

// 引入 Vant
import vant from 'vant';
import 'vant/lib/index.css';
// 引入 图片预览功能
import { ImagePreview } from 'vant';
Vue.use(vant)

Vue.use(vant);
 
// // 引入loading
// import loading from './components/loading/index'
// Vue.use(loading)

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
