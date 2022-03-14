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
        @search="searchFn"
      />
    </div>
    <!-- /搜索页面头部 -->

    <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="kw.length !== 0">
      <div
        class="sugg-item"
        v-for="(str, index) in suggestList"
        :key="index"
        v-html="lightFn(str, kw)"
        @click="suggestClickFn(str)"
      ></div>
    </div>
    <!-- /搜索建议列表 -->

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用right-icon插槽自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="historyClickFn(str)"
          >{{ str }}</span
        >
      </div>
    </div>
    <!-- /搜索历史 -->
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
      suggestList: [], // 联想建议列表数组
      history: JSON.parse(localStorage.getItem('his')) || [] // 搜索历史
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
          this.suggestList = res.data.data.options
        }, 300)
      }
    },

    // 处理关键字高亮
    lightFn(originStr, target) {
      // originStr：原来字符串
      // target：关键字
      const reg = new RegExp(target, 'ig') // i忽略大小写，g全局匹配

      // 替换后的值不能用target，否则返回的关键字都被替换了，原有的联想建议大小写则没了
      if (originStr) {
        return originStr.replace(reg, (match) => {
          // match就是匹配中时，原字符串的字符，添加高亮同时不会被更改大小写格式
          return `<span style="color: red">${match}</span>`
        })
      }
    },

    moveFn(theKw) {
      // 路由跳转在watch之前执行，所以要包裹定时器
      setTimeout(() => {
        this.$router.push({
          path: `/search_result/${theKw}`
        })
      }, 0)
    },
    // 输入框-搜索事件
    searchFn() {
      if (this.kw.length > 0) {
        // 搜索关键字保存到数组里
        this.history.push(this.kw)
        this.moveFn(this.kw)
      }
    },

    // 联想菜单的点击事件
    suggestClickFn(str) {
      this.history.push(str)
      this.moveFn(str)
    },
    // 历史记录点击事件
    historyClickFn(str) {
      this.moveFn(str)
    },

    // 清除历史记录
    clearFn() {
      this.history = []
    }
  },

  watch: {
    // 监听历史记录数组的改变
    history: {
      deep: true,
      handler() {
        // 立刻覆盖式的保存到本地
        // set无序不重复数组
        // 如果值是对象，比较的是对象内存地址
        const theSet = new Set(this.history)
        // 将set转回Array数组
        const arr = Array.from(theSet)
        localStorage.setItem('his', JSON.stringify(arr))
      }
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

// 搜索历史
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0 8px;
    border-radius: 10px;
  }
}
</style>
