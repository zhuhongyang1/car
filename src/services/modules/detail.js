import request from '@/utils/request';

// 获取弹框列表
export let getDetailList = (id)=>{
    return request(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}