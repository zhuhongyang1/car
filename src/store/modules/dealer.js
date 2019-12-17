import { dealerFunc } from '@/services'

const state = {
    list: [],
    cityID: '',
    carID: ''
}

const mutations = {
    updateList(state, payload) {
        state.list = payload
    },
    updateCarID(state, payload) {
        state.carID = payload
    },
    updateCityID(state, payload) {
        if (payload) {
            state.cityID = payload 
        }
    }
}

const actions = {
    async getDealerList({ commit, state }, payload) {
        let params = {}
        if (payload || state.cityID) {
            params.cityId = payload || state.cityID
        }
        if (state.carID) {
            params.carId = state.carID
        }
        const res = await dealerFunc(params)
        if (res.code === 1) {
            commit('updateList', res.data)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}