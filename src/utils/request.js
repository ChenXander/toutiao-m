// 请求模块
import theAxios from 'axios'
import router from '@/router'
import { Notify } from 'vant'
import { getToken, removeToken, setToken } from '@/utils/token.js'
import { getNewTokenAPI } from '@/api'

const axios = theAxios.create({
  baseURL: 'http://toutiao.itheima.net/', // 接口的基准路径
  timeout: 20000 // 请求超时时间
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 统一携带token
  // 判断本地有token在携带，判断具体api/index.js如果没有携带Authorization，再添加
  // 可选链操作符：?. 如果前面对象里没有length，整个表达式原地返回undefined
  // 如果getToken()在原地有token值，才能调用length获取长度
  if (getToken()?.length > 0 && config.headers.Authorization === undefined) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么,状态码2xx,3xx
  return response
}, async function (error) {
  // 对响应错误做点什么,状态码4xx,5xx
  if (error.response.status === 401) {
    // * 不能使用this.$router(因为this不是vue组件对象无法调用$router)
    // * 导入router解决
    // Notify({ type: 'warning', message: '身份已过期' })
    removeToken() // 先清除token，才能让路由守卫判断失效，放行去登录页
    // 方式1：清除token，强制跳转到登录，用户有感知
    // router.replace('/login')

    // 方式2：使用refresh_token换回新的token在继续使用，js代码实现，用户无感知效果好
    const res = await getNewTokenAPI()
    // 1.将新的token更新在本地
    setToken(res.data.data.token)
    // 2.更新新的token在请求头里
    error.config.headers.Authorization = `Bearer ${res.data.data.token}`
    // 3.未完成这次请求，再一次发起
    // error.config就是上一次请求的配置对象，结果要return回原本逻辑调用的地方，仍是一个promise对象
    return axios(error.config)
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    // 刷新的refresh_token也过期了
    localStorage.clear()
    Notify({ type: 'warning', message: '身份已过期' })
    router.replace('/login')
  }
})

export default ({ url, method = 'GET', params = {}, data = {}, headers = {} }) => {
  return axios({
    url,
    method,
    params,
    data,
    headers
  })

  /*  //* 替换ajax
    return new Promise((resolve, reject) => {
      //* 判断如果有params值，则自己写js代码将params对象的key和value拼接到url
      $.ajax({
        url,
        data,
        headers,
        type:method,
        success:(res) => {
          resolve(res)
        },
        error: err = > {
          reject(err)
        }
      })
    })
  */
}
