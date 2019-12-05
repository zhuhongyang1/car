import request from '@/utils/request'

// 获取车系
export let carSeries = (id) => {
    return request(`v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
}