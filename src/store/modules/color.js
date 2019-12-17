import { getColorList } from '@/services'

const state = {
    keyList: [],
    obj: {}
}

const mutations = {
    updateObj(state, payload) {
        state.obj = payload
    },
    updateKey(state, payload) {
        state.keyList = payload
    }
}

const actions = {
    async getColorList({commit}, payload) {
        const res = await getColorList(payload)
        const arr = Object.keys(res.data)
        arr.sort((a, b) => {
            return b - a
        })
        commit('updateObj', res.data)
        commit('updateKey', arr)
    }
}   

export default {
    namespaced: true,
    state, 
    mutations,
    actions
}