import {jxs} from '@/services/index'

const state = {
    data: [],
}
const mutations = {
    updateList(state, payload){
        state.data = payload;
    }
}
const actions = {
    async jxs({commit},payload){
        let res = await jxs(payload);
        commit('updateList', res.data);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}