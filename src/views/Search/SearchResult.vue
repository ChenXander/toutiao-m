<template>
  <div>
    <!-- 搜索结果页头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- /搜索结果页头部导航 -->

    <!-- 文章列表 -->
    <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="obj in articleList"
          :key="obj.art_id"
          :artItem="obj"
          :isShow="false"
        ></ArticleItem>
      </van-list>
    </div>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { searchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem'

export default {
  name: 'SearchResult',
  components: { ArticleItem },
  data() {
    return {
      page: 1, // 页码
      articleList: [], // 文章列表
      loading: false, // 加载状态
      finished: false // 是否全部加载完成
    }
  },
  async created() {
    const res = await searchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    this.articleList = res.data.data.results
  },
  methods: {
    async onLoad() {
      if (this.articleList.length > 0) {
        this.page++
        const res = await searchResultAPI({
          page: this.page,
          q: this.$route.params.kw
        })
        if (res.data.data.length === 0) {
          // 没有更多数据了
          this.finished = true
        }
        this.articleList = [...this.articleList, ...res.data.data.results]

        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
