import { carSeries } from '@/services/index'

const state = {
    show: false,
    carSeriesList: []
}   

const mutations = {
    isShow(state, payload) {
        state.show = payload
    },
    upCarSeriesList(state, payload) {
        state.carSeriesList = payload
    }
}

const actions = {
    async getCarSeries({commit}, payload) {
        const res = await carSeries(payload)
        if (res.code === 1) {
            commit('upCarSeriesList', res.data)
        }
    }
}

export default {
    namespaced: true,
    state, 
    mutations,
    actions
}