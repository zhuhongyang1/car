import axios from 'axios'
import { Notify } from 'vant';
import store from '@/store'

const instance = axios.create({
    baseURL: 'https://baojia.chelun.com',
    timeout: 5000,
})

instance.interceptors.request.use(function (config) {
    store.commit('showLoading')
    return config;
  }, function (error) {
    store.commit('hideLoading')
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(function (response) {
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
  }
);

export default instance