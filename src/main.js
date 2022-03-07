import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 导入vant组件库
import 'vant/lib/index.css'
import './styles/index.less' // 加载全局样式
import 'amfe-flexible' // 导入lib-flexible，动态设置rem

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
