import {getMasterBrandList} from '@/services/index'

const state = {
    list: [],
    listArr: []
}

const mutations = {
    updateList(state, payload){
        state.list = payload;
    },
    upList(state, payload){
        state.listArr = payload;
    },
}
const actions = {
    async getMasterBrandList({commit}){
        let res = await getMasterBrandList();
        const obj = {}
        res.data.forEach(item=>{
            if(!obj[item.Spelling.slice(0,1)]){
              obj[item.Spelling.slice(0,1)] = [item]
            }else{
              obj[item.Spelling.slice(0,1)].push(item)
            }
          })
        const list = Object.keys(obj)
        list.unshift('#')
        commit('updateList', obj);
        commit('upList', list);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}