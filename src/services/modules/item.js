import request from '@/utils/request';

// 获取弹框列表
export let getAlertList = (id)=>{
    return request(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`)
}