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

// 文章评论-发布评论
export const commentSendAPI = ({ id, content, art_id = null }) => {
  // 1.axios中data请求体传参，如果值为null是不会忽略这个参数
  // 也会把参数名和值携带后台(只有parmas遇到null会忽略)
  // 2.形参art_id可选参数，如果逻辑页面是对文章评论，则不需要传递art_id
  // 所以这时，内部art_id值为null就证明此次调用是针对文章评论

  // data请求体对象需要自己处理
  const obj = {
    target: id,
    content
  }
  if (art_id !== null) { // 如果本次有第三个参数，证明是对评论进行回复，否则是对文章回复
    obj.art_id = art_id
  }
  return axios({
    url: '/v1_0/comments',
    method: 'POST',
    data: obj
  })
}

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

// 文章收藏
export const articleCollectionAPI = ({ artId }) => axios({
  url: '/v1_0/article/collections',
  method: 'POST',
  data: {
    target: artId
  }
})

// 文章取消收藏
export const articleDisCollectionAPI = ({ artId }) => axios({
  url: `/v1_0/article/collections/${artId}`,
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

// 刷新用户token
export const getNewTokenAPI = () => axios({
  url: '/v1_0/authorizations',
  method: 'PUT',
  headers: {
    // 请求拦截器统一携带的token，而这次请求携带的是refresh_tokne
    // 所以在axios请求拦截器里判断是为了这种情况准备
    Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
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

// 获取用户个人资料
export const userProfileAPI = () => axios({
  url: '/v1_0/user/profile',
  method: 'GET'
})

// 获取用户基本信息
export const userAPI = () => axios({
  url: '/v1_0/user',
  method: 'GET'
})

// 编辑头像
export const updateUserPhotoAPI = (fd) => axios({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: fd // fd外面一会传进来的new FormData() 表单对象
})

// 更新用户基本资料
export const updateUserProfileAPI = (dataObj) => {
  // 判断是否携带某个参数
  const obj = {
    name: '',
    gender: 0,
    birthday: '',
    intro: ''
  }
  for (const prop in obj) {
    if (dataObj[prop] === undefined) {
      delete obj[prop]
    } else {
      obj[prop] = dataObj[prop]
    }
  }
  return axios({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: obj
  })
}
