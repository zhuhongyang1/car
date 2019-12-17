import { getImgList, getAllImgList } from '@/services'
import store from '@/store'

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
    index: 0,
    count: 0,
    arrLen: 0,
    scroll: {}
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
    },
    setImageCount(state, payload) {
        state.count = payload
    },
    setImgLength(state, payload) {
        state.arrLen = payload
    },
    saveScroll(state, payload) {
        state.scroll = payload
    }

}

const actions = {
    async getImgList({commit, state}, payload) {
        if (state.ColorID) {
            payload.ColorID = state.ColorID
        }
        if (state.CarId) {
            payload.CarId = state.CarId
        }

        const res = await getImgList(payload) 
        if (res.code === 1) {
            commit('updateList', res.data)
        }
    },
    async getAllImg({ commit, state }, payload) {
        console.log(payload)
        const res = await getAllImgList(payload)
        console.log(res.data)
        if (res.code === 1) {
           
            if (Object.keys(state.scroll).length) {
                store.commit('showLoding2', false)
                state.scroll.refresh()
                state.scroll.finishPullUp()
            }
            
            let arr = state.allImg || []

            let newArr = arr.concat(res.data.List)
            console.log(newArr.length)
            console.log(res.data.Count)
            commit('setImgLength', newArr.length)
            commit('setDone', false)
            console.log(newArr)
            commit('getAllImgB', newArr)
            commit('setImageCount', res.data.Count)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}