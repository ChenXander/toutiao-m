import Vue from 'vue'
import VueRouter from 'vue-router'
import Vant from 'vant' // 导入vant组件库
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(VueRouter)

// 路由表
const routes = []

const router = new VueRouter({
  routes
})

export default router
