import {getDetailList} from '@/services/index'

const state = {
    del: []
}

const mutations = {
    updateList(state, payload){
        state.del = payload;
    }
}
const actions = {
    async getDetailList({commit},payload){
        let res = await getDetailList(payload);
        commit('updateList', res.data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}