import { getImgList } from '@/services'

const state = {
    list: []
}

const mutations = {
    updateList(state, payload) {
        state.list = payload
    }
}

const actions = {
    async getImgList({commit}, payload) {
        const res = await getImgList(payload) 
        if (res.code === 1) {
            res.data.forEach(item1 => {
                item1.List.forEach(item2 => {
                    item2.Url = item2.Url.replace('{0}', 2)
                })
            })
            console.log(res.data)
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