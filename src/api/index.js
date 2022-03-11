// 统一封装接口方法
// 每个方法负责请求一个url，便于统一管理
import request from '@/utils/request.js'

// 获取所有频道
export const getAllChannelsAPI = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 登录接口
export const loginAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'POST'
})
