<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        offset="50"
      >
        <!-- 文章列表 -->
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :artItem="item"
        ></ArticleItem>
        <!-- /文章列表 -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getAllArticleListAPI } from '@/api'

export default {
  name: '',
  components: { ArticleItem },
  props: {
    channelId: Number
  },
  data() {
    return {
      list: [], // 文章列表数组
      loading: false, // 底部加载状态
      finished: false, // 底部完成状态
      theTime: Date.now(), // 用于分页
      isLoading: false // 顶部下拉刷新
    }
  },
  created() {
    this.getArticleListFn()
  },
  methods: {
    async getArticleListFn() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })

      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp

      this.loading = false // 关闭加载状态
      // 没有下一段数据
      if (res.data.data.pre_timestamp === null) {
        this.finished = true // 所有数据加载完结束加载
      }

      // 顶部加载结束
      this.isLoading = false
    },

    // 底部加载事件
    async onLoad() {
      if (this.list.length === 0) {
        this.loading = false // 第一次上面还是判定触底(触发onLoad方法时loading自动改为true)
        // 如果不改回来，下次触底不在执行onLoad方法
        return // 如果页面没有数据，没有高度，让本次onLoad不往下执行
      }

      this.getArticleListFn()
    },

    // 顶部刷新数据
    async onRefresh() {
      this.list = []
      this.theTime = Date.now()

      this.getArticleListFn()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
