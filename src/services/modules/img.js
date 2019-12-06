import request from '@/utils/request'

export let getImgList = (params) => {
    return request(`http://baojia.chelun.com/v2-car-getImageList.html?${params}`)
}