import Vue from 'vue'
import Vuex from 'vuex'
import creareLogger from 'vuex/dist/logger';

import home from './modules/home'
import item from './modules/item'
import detail from './modules/detail'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    item,
    detail
  },
  plugins: [creareLogger()]
})
