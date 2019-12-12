import { getMasterBrandList } from '@/services/index'
 
const state = {
    masterBrandObj: {},
    masterKeys: [],
    listElement: null
}

const mutations = {
    updateList(state, payload) {
        state.masterBrandObj = payload
    },
    masterKeys(state, payload) {
        state.masterKeys = payload
    },
    scrollToList(state, payload) {
        state.listElement = payload
    }
}

const actions = {
    async getMasterBrandList({ commit }, payload) {
        let res = await getMasterBrandList()
        // console.log('res...', res.data)
        if (res.code === 1) {
            // 处理数据
            const obj = {}
            res.data.forEach(item => {
                if (!obj[item.Spelling.slice(0, 1)]) {
                    obj[item.Spelling.slice(0, 1)] = [item]
                } else {
                    obj[item.Spelling.slice(0, 1)].push(item)
                }
            })
            let keys = Object.keys(obj)
            keys.unshift('#')
            commit('masterKeys', keys)
            commit('updateList', obj)
 
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}