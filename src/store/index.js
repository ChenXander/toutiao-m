import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://img2.baidu.com/it/u=3216259280,2711918258&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' // 头像地址(默认值)
  },
  mutations: {
    // mutations最好大写，编码风格
    SET_USERPHOTO(state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
