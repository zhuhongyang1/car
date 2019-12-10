import { dealerFunc } from '@/services'

const state = {
    list: [],
    cityID: '',
    carID: ''
}

const mutations = {
    // 更新经销商列表
    updateList(state, payload) {
        state.list = payload
    },
    // 更新carID
    updateCarID(state, payload) {
        state.carID = payload
    },
    // 更新cityID
    updateCityID(state, payload) {
        if (payload) state.cityID = payload 
    }
}

const actions = {
    async getDealerList({ commit, state }) {
        let params = {}
        if (state.cityID) {
            params.cityId = state.cityID
        }
        if (state.carID) {
            params.carId = state.carID
        }
        const res = await dealerFunc(params)
        console.log(res)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}