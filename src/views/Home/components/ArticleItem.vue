<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artItem.title }}</span>
        <!-- 单图 -->
        <img
          class="thumb"
          v-if="artItem.cover.type === 1"
          :src="artItem.cover.images[0]"
          alt=""
        />
      </div>
      <!-- 多图 -->
      <div class="thumb-box" v-if="artItem.cover.type > 1">
        <img
          class="thumb"
          v-for="(imgUrl, index) in artItem.cover.images"
          :key="index"
          :src="imgUrl"
          alt=""
        />
      </div>
    </template>
    <!-- /标题区的插槽 -->

    <!-- label区域插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artItem.aut_name }}</span>
          <span>{{ artItem.comm_count }}评论</span>
          <span>{{ formatTime(artItem.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
    <!-- /label区域插槽 -->
  </van-cell>
  <!-- /一条文章单元格 -->
</template>

<script>
import { timeAgo } from '@/utils/date.js'

export default {
  name: '',
  components: {},
  props: {
    artItem: Object // 文章对象
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    formatTime: timeAgo // 函数体是timeAgo
  }
}
</script>

<style lang="less" scoped>
// 标题样式
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

// label描述样式
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 文章信息span
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

// 图片样式，矩形黄金比例：0.618
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

// 三图，图片容器
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
