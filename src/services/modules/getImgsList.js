import request from '@/utils/request'

// 获取车系
export let getImgsList = (SerialID) => {
    return request(`/v2-car-getImageList.html?SerialID=${SerialID}`)
}