import {getImgsList} from '@/services/index'

const state = {
    img: []
}

const mutations = {
    updateList(state, payload){
        state.img = payload;
    }
}
const actions = {
    async getImgsList({commit},payload){
        let res = await getImgsList(payload);
        console.log(res.data)
        for (let key in res.data) {
            res.data[key].List.forEach(item => {
                item.Url = item.Url.replace('{0}', 3)
            })
        }
        commit('updateList', res.data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}