import Vue from 'vue'
import Vuex from 'vuex'

// 引入日志 
import createLogger from 'vuex/dist/logger'

// 引入主页 左边和右边 子模块
import home from './modules/home'

// 引入主页 车系 子模块
import carSeries from './modules/carSeries'

// 引入 详情页 子模块
import detail from './modules/detail'

// 引入 图片 子模块
import img from './modules/img'

// 引入 颜色 子模块
import color from './modules/color'

// 引入 城市 子模块
import city from './modules/city'

// 引入 经销商 子模块
import dealer from './modules/dealer'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingFlag: false
  },
  mutations: {
    showLoading(state) {
      state.loadingFlag = true
    },
    hideLoading(state) {
      state.loadingFlag = false
    }
  },
  modules: {
    home,
    carSeries,
    detail,
    img,
    color,
    city,
    dealer
  },
  // plugins: [ createLogger() ]
})
