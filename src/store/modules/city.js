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
    // 默认城市
    updataDefaultCity(state, payload) {
        state.defaultCity = payload
    },
    // 1级城市列表
    updateCityList(state, payload) {
        state.cityList = payload
    },
    // 2级城市列表
    updateCityListTwo(state, payload) {
        state.cityList2 = payload
    },
    // 设置城市名称
    setCityName(state, payload) {
        state.cityName = payload
    },
    // 设置主组件的 是否隐藏
    setCityFlag(state, payload) {
        state.cityFlag = payload
    },
    // 保存城市ID
    saveCityID(state, payload) {
        state.cityID = payload
    }
}

const actions = {
    // 获取默认城市
    async getDefaultCity({ commit }) {
        const res = await getAutoCity()
        if (res.code === 1) {
            commit('updataDefaultCity', res.data)
            commit('saveCityID', res.data.CityID)
        }
    },
    // 获取1级城市列表
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