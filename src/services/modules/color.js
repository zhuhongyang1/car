import request from '@/utils/request'

export let getColorList = (id) => {
    return request(`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${id}`)
}