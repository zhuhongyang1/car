import {cityList} from '@/services/index'

const state = {
    cityList: [],
    cityItem:[]
}
const mutations = {
    updateList(state, payload){
        state.cityList = payload;
    },
    updateList2(state, payload){
        state.cityItem = payload;
    }
}
const actions = {
    async cityList({commit}){
        let res = await cityList();
        commit('updateList', res.data);
    },
    async cityItem({commit},payload){
        let res = await cityList(payload);
        console.log(res)
        commit('updateList2', res.data);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}