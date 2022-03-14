<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list">
      <!-- 评论的item项 -->
      <div class="cmt-item">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img src="" alt="" class="avatar" />
            <span class="uname">zs</span>
          </div>

          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon name="like" size="16" color="red" />
            <van-icon name="like-o" size="16" color="grey" />
          </div>
        </div>
        <!-- /头部区域 -->

        <!-- 主体区域 -->
        <div class="cmt-body">给予it大发放看回放哈哈发客户奋达科技</div>
        <!-- /主体区域 -->

        <!-- 尾部区域 -->
        <div class="cmt-footer">3天前</div>
        <!-- /尾部区域 -->
      </div>
      <!-- /评论的item项 -->
    </div>
    <!-- /评论列表 -->
  </div>
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
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}
</style>
