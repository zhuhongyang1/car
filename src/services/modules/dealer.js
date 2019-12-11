import request from '@/utils/request'

export let dealerFunc = (params) => {
    return request.get('https://baojia.chelun.com/v2-dealer-alllist.html', { params })
}