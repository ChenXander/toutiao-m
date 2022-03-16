// 对vue的全局指令进行封装

// 自定义指令,自动聚焦
const directiveObj = { // 封装中间件函数插件
  install(Vue) {
    Vue.directive('fofo', {
      // el代表指令所在的标签
      // 指令所在标签被插入到真是DOM时才触发，如果标签用display:none隐藏再出现，不会触发inserted
      inserted(el) {
        // 指定所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试获取
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      },
      update(el) { // 指令所在标签被更新时触发
        // 指定所在van-search组件
        // 组件根标签是div，input在内部
        // 以上都是原生标签对象
        if (el.nodeName === 'TEXTAREA' || el.nodeName === 'INPUT') {
          el.focus()
        } else {
          // el本身不是输入框，尝试获取
          const theInput = el.querySelector('input')
          const theTextArea = el.querySelector('textarea')
          if (theInput) theInput.focus()
          if (theTextArea) theTextArea.focus()
        }
      }
    })
  }
}

export default directiveObj
