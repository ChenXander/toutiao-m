<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="reFreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求下一页数据的时间戳
      error: false, // 控制列表加载失败状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      reFreshSuccessText: '' // 下拉刷新成功提示文本
    }
  },
  created() {},
  methods: {
    // 初始化或滚动到底的时候触发调用
    async onLoad() {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶文章
        })
        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        this.list.push(...results) // 新数据合并到旧数据中

        // 3.本次数据加载结束后重置加载状态
        this.loading = false

        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果没有更多数据，finished设为true结束触发加载更多
          this.finished = true
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true

        // 请求失败了，loading也需要关闭
        this.loading = false
      }
    },

    // 下拉刷新
    async onRefresh() {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新每次请求当前最新数据，传递最新时间戳
          with_top: 1 // 是否包含置顶文章
        })

        // 2.将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3.关闭下拉刷新的loading状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.reFreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.reFreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
