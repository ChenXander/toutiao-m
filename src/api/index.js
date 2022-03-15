// 统一封装接口方法
// 每个方法负责请求一个url，便于统一管理
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

// 获取文章推荐数据
export const getAllArticlesListAPI = ({ channel_id, timestamp }) => axios({
  url: '/v1_0/articles',
  method: 'GET',
  params: { // 这里的参数会被axios拼接到URL?后面(查询字符串)
    channel_id,
    timestamp
  }
})

// 文章反馈面板-不感兴趣
export const dislikeArticleAPI = ({ artId }) => axios({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章反馈面板-反馈垃圾内容
export const reportArticleAPI = ({ artId, type }) => axios({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target: artId,
    type: type,
    remark: '如果你想写，你可以在逻辑页面判断下，如果类型是0，再给一个弹出框输入其他问题，传参到这里'
  }
})

// 搜索-联想菜单列表
export const suggestListAPI = ({ keywords }) => axios({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keywords
  }
})

// 搜索-搜索结果列表
export const searchResultAPI = ({ page = 1, per_page = 10, q }) => axios({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page,
    per_page,
    q
  }
})
// 获取文章详情
export const detailAPI = ({ artId }) => axios({
  url: `/v1_0/articles/${artId}`,
  method: 'GET'
})

// 文章点赞
export const likeArticleAPI = ({ artId }) => axios({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章取消点赞
export const unLikeArticleAPI = ({ artId }) => axios({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE'
})

// 文章评论列表
export const commentsListAPI = ({ id, offset = null, limit = 10 }) => axios({
  url: '/v1_0/comments',
  method: 'GET',
  params: { // axios只针对params参数，如果发现键值对，值为null，会忽略此参数名和值不携带在url?后面
    type: 'a', // 如果值会变化则不选择固定值，由外面传值进来
    source: id,
    offset,
    limit
  }
})

// 文章评论点赞
export const commentLikingAPI = ({ comId }) => axios({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target: comId
  }
})

// 文章评论取消点赞
export const commentDisLikingAPI = ({ comId }) => axios({
  url: `/v1_0/comment/likings/${comId}`,
  method: 'DELETE'
})

// 登录接口
export const loginAPI = ({ mobile, code }) => axios({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 关注用户
export const userFollowedAPI = ({ userId }) => axios({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: userId
  }
})
// 取消关注
export const userUnFollowedAPI = ({ userId }) => axios({
  url: `/v1_0/user/followings/${userId}`,
  method: 'DELETE'
})
