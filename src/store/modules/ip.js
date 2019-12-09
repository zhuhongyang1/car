import {ip} from '@/services/index'

const state = {
    ipData: [],
}
const mutations = {
    updateList(state, payload){
        state.ipData = payload;
    }
}
const actions = {
    async ip({commit}){
        let res = await ip();
        commit('updateList', res.data);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}