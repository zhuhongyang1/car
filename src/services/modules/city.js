import request from '@/utils/request';

// 获取弹框列表
export let cityList = (params)=>{
    return request('https://baojia.chelun.com/v1-city-alllist.html', { params })
}