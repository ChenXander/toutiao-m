import axios from '@/utils/request.js'

// 获取所有频道
export const getAllChannelsAPI = () => axios({
  url: '/v1_0/channels',
  method: 'GET'
})

// 获取用户频道,若没有登录则默认返回后台设置的默认频道列表
export const getUserChannelsAPI = () => axios({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 频道-更新覆盖频道
export const updateChannelsAPI = ({ channels }) => axios({
  url: '/v1_0/user/channels',
  method: 'PUT',
  data: {
    channels // 用户已选整个频道数组
  }
})

// 删除用户指定的频道
export const removeTheChannelAPI = ({ channelId }) => axios({
  url: `/v1_0/user/channels/${channelId}`,
  method: 'DELETE'
})
