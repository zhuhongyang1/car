import request from '@/utils/request';

// 获取弹框列表
export let ip = ()=>{
    return request('https://baojia.chelun.com/location-client.html')
}