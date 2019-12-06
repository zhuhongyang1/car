import {getAlertList} from '@/services/index'

const state = {
    one: []
}

const mutations = {
    updateList(state, payload){
        state.one = payload;
    }
}
const actions = {
    async getAlertList({commit},payload){
        let res = await getAlertList(payload);
        commit('updateList', res.data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}