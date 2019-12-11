import { getImgList, getAllImgList } from '@/services'

const state = {
    list: [],
    ColorID: '',
    CarId: '',
    name: '',
    colorName: '',
    saveCarId: '',
    allImg: [],
    page: 0,
    done: false,
    index: 0
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
        // console.log(payload)
        state.saveCarId = payload
    },
    getAllImgB(state, payload) {
        state.allImg = payload
    },
    setPage(state, payload) {
        state.page = payload
    },
    setDone(state, payload) {
        state.done = payload
    },
    saveIndex(state, payload) {
        state.index=  payload
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
            console.log(res.data)
            commit('updateList', res.data)
        }
    },
    async getAllImg({ commit, state }, payload) {
        const res = await getAllImgList(payload)
        
        // state.allImg.concat(res.data.List)
        // state.allImg.push(1)
        if (res.code === 1) {
            let arr = state.allImg || []
            let newArr = arr.concat(res.data.List)
            commit('setDone', false)
            commit('getAllImgB', newArr)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}