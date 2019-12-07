import axios from 'axios'
import { Notify } from 'vant';
import store from '@/store'


// 创建axios实例
const instance = axios.create({
    baseURL: 'https://baojia.chelun.com',
    timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.commit('showLoading')
    return config;
  }, function (error) {
    store.commit('hideLoading')
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status === 200) {
        store.commit('hideLoading')
        return response.data 
    } else {
        store.commit('hideLoading')
        Notify({
            type: 'warning',
            message: response.text
        })
    }
    return response;
  }, function (error) {
    Notify({
        type: 'warning',
        message: error.message
    })
    // 对响应错误做点什么
    // return Promise.reject(error);
  }
);

export default instance