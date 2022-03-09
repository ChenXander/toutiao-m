<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleList',
  components: {},
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
      timestamp: null // 请求下一页数据的时间戳
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
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// .article-list {
//   position: fixed;
//   top: 180px;
//   bottom: 100px;
//   right: 0;
//   left: 0;
//   overflow-y: auto;
// }
</style>
