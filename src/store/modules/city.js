import { getAutoCity, getCityList } from '@/services'

const state = {
    defaultCity: {},
    cityList: [],
    cityList2: [],
    cityName: '',
    cityFlag: false,
    cityID: ''
}

const mutations = {
    updataDefaultCity(state, payload) {
        state.defaultCity = payload
    },
    updateCityList(state, payload) {
        state.cityList = payload
    },
    updateCityListTwo(state, payload) {
        state.cityList2 = payload
    },
    setCityName(state, payload) {
        state.cityName = payload
    },
    setCityFlag(state, payload) {
        state.cityFlag = payload
    },
    saveCityID(state, payload) {
        state.cityID = payload
    }
}

const actions = {
    async getDefaultCity({ commit }) {
        const res = await getAutoCity()
        if (res.code === 1) {
            commit('updataDefaultCity', res.data)
            commit('saveCityID', res.data.CityID)
        }
    },
    async getCityListOne({ commit }, payload) {
        const res = await getCityList()
        if (res.code === 1) {
            commit('updateCityList', res.data)
        }
        
        const res2 = await getCityList(payload) 
        if (res2.code === 1) {
            commit('updateCityListTwo', res2.data)
        }


    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}