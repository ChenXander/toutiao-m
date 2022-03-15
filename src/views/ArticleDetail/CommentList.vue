<template>
  <div>
    <!-- 评论列表 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtBox,
        'art-cmt-container-2': !isShowCmtBox
      }"
    >
      <!-- 评论的item项 -->
      <div class="cmt-item" v-for="obj in commentArr" :key="obj.com_id">
        <!-- 头部区域 -->
        <div class="cmt-header">
          <!-- 头部左侧 -->
          <div class="cmt-header-left">
            <img :src="obj.aut_photo" alt="" class="avatar" />
            <span class="uname">{{ obj.aut_name }}</span>
          </div>

          <!-- 头部右侧 -->
          <div class="cmt-header-right">
            <van-icon
              name="like"
              size="16"
              color="red"
              v-if="obj.is_liking === true"
              @click="likeFn(true, obj)"
            />
            <van-icon
              name="like-o"
              size="16"
              color="grey"
              v-else
              @click="likeFn(false, obj)"
            />
          </div>
        </div>
        <!-- /头部区域 -->

        <!-- 主体区域 -->
        <div class="cmt-body">{{ obj.content }}</div>
        <!-- /主体区域 -->

        <!-- 尾部区域 -->
        <div class="cmt-footer">{{ timeAgo(obj.pubdate) }}</div>
        <!-- /尾部区域 -->
      </div>
      <!-- /评论的item项 -->
    </div>
    <!-- /评论列表 -->

    <!-- 发表评论-区域1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowCmtBox === true">
      <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
      <div class="ipt-cmt-div" @click="toggleShowFn">发表评论</div>
      <div class="icon-box">
        <van-badge :content="totalCount === 0 ? '' : totalCount" max="99">
          <van-icon
            name="comment-o"
            size="0.53333334rem"
            @click="commentClickFn"
          />
        </van-badge>
        <van-icon name="star-o" size="0.53333334rem" />
        <van-icon name="share-o" size="0.53333334rem" />
      </div>
    </div>
    <!-- /发表评论-区域1 -->

    <!-- 发表评论-区域2 -->
    <div class="cmt-box van-hairline--top" v-else>
      <!-- v-fofo 全局自定义自动聚焦指令 -->
      <textarea
        placeholder="友善评论、理性发言、阳光心灵"
        v-fofo
        @blur="isShowCmtBox = true"
      ></textarea>
      <van-button type="default" disabled>发布</van-button>
    </div>
    <!-- /发表评论-区域2 -->
  </div>
</template>

<script>
import { commentsListAPI, commentLikingAPI, commentDisLikingAPI } from '@/api'
import { timeAgo } from '@/utils/date.js'

export default {
  name: '',
  components: {},
  data() {
    return {
      offset: null, // 偏移量评论ID
      commentArr: [], // 评论列表
      totalCount: 0, // 评论总数量(后台返回)
      isShowCmtBox: true // 默认显示第一套评论容器
    }
  },
  async created() {
    const res = await commentsListAPI({
      id: this.$route.query.art_id // 文章id
    })
    this.commentArr = res.data.data.results // 评论数据
    this.totalCount = res.data.data.total_count // 评论总数
  },
  methods: {
    timeAgo,

    // 评论点赞
    async likeFn(bool, commentObj) {
      if (bool) {
        // 用户取消点赞
        commentObj.is_liking = false
        await commentDisLikingAPI({
          comId: commentObj.com_id
        })
      } else {
        // 用户点赞
        commentObj.is_liking = true
        await commentLikingAPI({
          comId: commentObj.com_id
        })
      }
    },

    // 显示第二套评论输入框
    toggleShowFn() {
      this.isShowCmtBox = false
    },

    // 评论按钮的点击事件
    commentClickFn() {
      // 只要设置window.scrollTo(0,文章内容高度)
      // JS代码是在html+css运行后，真实代码已经在网页上了，从document往下获取标签时ok的
      /*  const articleHeight =
        document.querySelector('.article-container').scrollHeight
         window.scrollTo()使网页进行滚动，设置相应的坐标，就可以让网页滚动到屏幕的最顶端
         如果底下没有内容了，则不再滚动
      window.scrollTo(0, articleHeight) */

      // css可以做动画：轮播图，css3位移，旋转，动画(必须修改css属性才能触发css动画)
      // js也可以做动画：滚动条滚动,使用：计时器间隔时间，修改目标状态

      // 比较方便的方法：scrollIntoView()既能滚动也能带动画，能让原生标签滚动到屏幕的最上面
      // 注意：可能存在兼容性问题，可能会在某些平台没有动画效果
      document.querySelector('.like-box').scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
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

// 发表评论
.art-cmt-container-1 {
  padding-bottom: 46px;
}

.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子-1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子-2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: #fff;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
