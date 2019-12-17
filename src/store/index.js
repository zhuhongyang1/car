import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'

import home from './modules/home'

import carSeries from './modules/carSeries'

import detail from './modules/detail'

import img from './modules/img'

import color from './modules/color'

import city from './modules/city'

import dealer from './modules/dealer'

import sideShow from './modules/slideShow'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingFlag: false,
    loding2: false
  },
  mutations: {
    showLoading(state) {
      state.loadingFlag = true
    },
    hideLoading(state) {
      state.loadingFlag = false
    },
    showLoding2(state, payload) {
      state.loding2 = payload
    }
  },
  modules: {
    home,
    carSeries,
    detail,
    img,
    color,
    city,
    dealer,
    sideShow
  },
})
