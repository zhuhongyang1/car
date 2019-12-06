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

import getImgsList from './modules/getImgsList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    carSeries,
    detail,
    getImgsList
  },
  // plugins: [ createLogger() ]
})
