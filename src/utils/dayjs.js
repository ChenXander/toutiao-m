import Vue from 'vue'
import dayjs from 'dayjs' // 导入dayjs
import 'dayjs/locale/zh-cn' // dayjs默认语言是英文，配置中文
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime) // 处理相对时间插件

// 全局时间过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
