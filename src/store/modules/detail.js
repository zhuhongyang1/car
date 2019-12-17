import { detailData } from '@/services'



function formateYear(list) {
    const newList = []
    let flag = true
    list.forEach(item => {
        if (item.market_attribute.year) {
            flag && newList.push('全部')
            flag = false 
            newList.indexOf(item.market_attribute.year) === -1 && newList.push(item.market_attribute.year)
        }
    })
    return newList
}

function sortCarList(list) {
    list.sort((a, b) => {
        if (a.exhaust === b.exhaust) {
            if (a.max_power !== b.max_power) {
                return a.max_power - b.max_power
            }
        } else {
            return a.exhaust - b.exhaust
        }
    })
}

const state = {
    dataObj: {},
    year: [],
    car: {},
    carInfo: {},
    defaultName: '',
    carID: ''
}

const mutations = {
    updateObj(state, payload) {
        state.dataObj = payload
    },
    updateYear(state, payload) {
        state.year = payload
    },
    updateCar(state, payload) {
        state.car = payload
    },
    updateCarInfo(state, payload) {
        state.carInfo = payload
    },
    defaultData(state, payload) {
        state.defaultName = payload
    },
    updateCarID(state, payload) {
        state.carID = payload
    }
}

const actions = {
    async getDetailData({commit}, payload) {
        const res = await detailData(payload)
        if (res.code === 1) {
            sortCarList(res.data.list)
            const year = formateYear(res.data.list)
            let data = {}
            res.data.list.forEach(item => {
                let key = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`
                let obj = {
                    key1: `${item.market_attribute.year}款 ${item.car_name}`,
                    key2: `${item.horse_power}马力${item.gear_num}挡${item.trans_type}`,
                    key3: [`指导价 ${item.market_attribute.official_refer_price}`, `${item.market_attribute.dealer_price_min}起`],
                    id: item.car_id
                }

                if (item.market_attribute.year && !data['全部']) {
                    data['全部'] = []
                } 

                if (!data[item.market_attribute.year]) {
                    data[item.market_attribute.year] = []
                }
                
                let i = data['全部'].findIndex(find => find.key === key)
                if (i === -1) {
                    data['全部'].push({
                        key: key,
                        list: [obj]
                    })
                } else {
                    data['全部'][i].list.push(obj)
                }

                const index = data[item.market_attribute.year].findIndex(find => find.key === key)
                if (index === -1) {
                    data[item.market_attribute.year].push({
                        key: key,
                        list: [obj]
                    })
                } else {
                    data[item.market_attribute.year][index].list.push(obj)
                }
                
            })
            
            commit('updateObj', data)
            commit('updateYear', year)
            commit('updateCar', res.data)
            const objCarInfo = {
                name: res.data.AliasName,
                pic: res.data.Picture
            }
            commit('updateCarInfo', objCarInfo)
            const id = res.data.list[0].car_id
            commit('updateCarID', id)
            let defaultInfo = data['全部'][0].list[0].key1
            commit('defaultData', defaultInfo)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}