<template>
  <div>
    <!-- 文章列表 -->
    <ArticleItem
      v-for="item in list"
      :key="item.art_id"
      :artItem="item"
    ></ArticleItem>
    <!-- /文章列表 -->
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
      list: [] // 文章列表数组
    }
  },
  async created() {
    const res = await getAllArticleListAPI({
      channel_id: this.channelId,
      timestamp: Date.now()
    })
    this.list = res.data.data.results
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
