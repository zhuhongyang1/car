import request from '@/utils/request';

// 获取弹框列表
export let jxs = (carId,cityId)=>{
    return request(`/v2-dealer-alllist.html?carId=${carId}?city=${cityId}`)
}