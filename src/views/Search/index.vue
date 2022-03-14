<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="#fff"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model.trim="kw"
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007bff"
        shape="round"
        @input="inputFn"
      />
    </div>
    <!-- /搜索页面头部 -->

    <!-- 搜索建议列表 -->
    <div class="sugg-list">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="lightFn(str.title, kw)"
      ></div>
    </div>
    <!-- /搜索建议列表 -->
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index.js'

export default {
  name: '',
  components: {},
  data() {
    return {
      kw: '', // 搜索关键词
      timer: null, // 防抖的定时器
      suggestList: [] // 联想建议列表数组
    }
  },
  created() {},
  methods: {
    // 输入框-内容实时改变触发事件方法
    inputFn() {
      clearTimeout(this.timer)

      if (this.kw.length === 0) {
        this.suggestList = []
      } else {
        // 防抖
        this.timer = setTimeout(async () => {
          const res = await suggestListAPI({
            keywords: this.kw
          })
          this.suggestList = res.data.data.results
        }, 300)
      }
    },

    // 处理关键字高亮
    lightFn(originStr, target) {
      // originStr：原来字符串
      // target：关键字
      const reg = new RegExp(target, 'ig') // i忽略大小写，g全局匹配

      // 替换后的值不能用target，否则返回的关键字都被替换了，原有的联想建议大小写则没了
      return originStr.replace(reg, (match) => {
        // match就是匹配中时，原字符串的字符，添加高亮同时不会被更改大小写格式
        return `<span style="color: red">${match}</span>`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}

// 搜索建议列表
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
