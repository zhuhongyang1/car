import request from '@/utils/request'

export let getAutoCity = (params) => {
    return request('https://baojia.chelun.com/location-client.html', { params })
}