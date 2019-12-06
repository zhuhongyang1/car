// 引入 service carSeries axios子模块
import { carSeries } from '@/services/index'

// 数据仓库
const state = {
    show: false,
    carSeriesList: []
}   

// 同步操作
const mutations = {
    // 点击标识
    isShow(state, payload) {
        state.show = payload
    },
    // 同步更新数据
    upCarSeriesList(state, payload) {
        state.carSeriesList = payload
    }
}

// 异步操作
const actions = {
    // 根据id获取车系数据
    async getCarSeries({commit}, payload) {
        const res = await carSeries(payload)
        if (res.code === 1) {
            // console.log(res)
            commit('upCarSeriesList', res.data)
        }
    }
}

// 导出
export default {
    namespaced: true, // 命名空间，方便不同模块之间的调用
    state, 
    mutations,
    actions
}