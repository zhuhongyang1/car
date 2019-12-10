import request from '@/utils/request'

export let detailData = (id) => {
    return request(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${id}`)
}