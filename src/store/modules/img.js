import { getImgList } from '@/services'

const state = {
    list: [],
    ColorID: '',
    CarId: '',
    name: '',
    colorName: '',
    saveCarId: ''
}

const mutations = {
    updateList(state, payload) {
        state.list = payload
    },
    setColorID(state, payload) {
        state.ColorID = payload
    },
    setCarId(state, payload) {
        state.CarId = payload
    },
    setName(state, payload) {
        state.name = payload
    },
    setColorName(state, payload) {
        state.colorName = payload
    },
    saveCarId(state, payload) {
        state.saveCarId = payload
    }
}

const actions = {
    async getImgList({commit, state}, payload) {
        // 判断是否存在 颜色ID
        if (state.ColorID) {
            payload.ColorID = state.ColorID
        }
        // 判断是否存在 车Id
        if (state.CarId) {
            payload.CarId = state.CarId
        }

        const res = await getImgList(payload) 
        // console.log(res)
        if (res.code === 1) {
            res.data.forEach(item1 => {
                item1.List.forEach(item2 => {
                    item2.Url = item2.Url.replace('{0}', 2)
                })
            })
            // console.log(res.data)
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