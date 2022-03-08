// 请求模块

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // config:本次请求的配置对象。里面有headers属性
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 必须返回config，否则请求停在此处出不去
    return config
  },
  function (error) {
    //   如果请求出错了（还没发出去）会进入此处
    return Promise.reject(error)
  }
)

// 响应拦截器

export default request
