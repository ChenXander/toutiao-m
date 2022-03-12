<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>文章标题</span>
      </div>
    </template>
    <!-- /标题区的插槽 -->

    <!-- label区域插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>作者</span>
          <span>0评论</span>
          <span>8个月</span>
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
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  created() {},
  methods: {}
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
</style>
