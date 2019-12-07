import { detailData } from '@/services'



// 格式化数据
function formateYear(list) {
    const newList = []
    // 只添加一次 全部
    let flag = true
    list.forEach(item => {
        // 判断是否存在，如果存在则添加 全部
        if (item.market_attribute.year) {
            flag && newList.push('全部')
            flag = false 
            newList.indexOf(item.market_attribute.year) === -1 && newList.push(item.market_attribute.year)
        }
    })
    return newList
}

// 排序
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
    car: {}
}

const mutations = {
    updateObj(state, payload) {
        // console.log(payload)
        state.dataObj = payload
    },
    updateYear(state, payload) {
        state.year = payload
    },
    updateCar(state, payload) {
        // console.log(payload)
        state.car = payload
    }
}

const actions = {
    async getDetailData({commit}, payload) {
        const res = await detailData(payload)
        if (res.code === 1) {
            // 排序
            sortCarList(res.data.list)
            // 抽出年份
            const year = formateYear(res.data.list)
            // 抽出所有数据
            let data = {}
            res.data.list.forEach(item => {
                // console.log(item)
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
            // 激活 mutations
            // 多个汽车详情数据
            commit('updateObj', data)
            // 年份
            commit('updateYear', year)
            // 汽车详情
            commit('updateCar', res.data)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}