import request from '@/utils/request'

export let getCityList = (params) => {
    return request('https://baojia.chelun.com/v1-city-alllist.html', { params })
}