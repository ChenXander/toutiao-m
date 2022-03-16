import axios from '@/utils/request.js'

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
