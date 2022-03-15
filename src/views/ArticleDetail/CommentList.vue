<template>
  <div>
    <!-- 评论列表 -->
    <!-- 1.van-list最好在这个div内，让底部文字/加载中，作为此div内容，
    容器padding-bottom底部文字也挤上去了，看得见 -->
    <div
      class="cmt-list"
      :class="{
        'art-cmt-container-1': isShowCmtBox,
        'art-cmt-container-2': !isShowCmtBox
      }"
    >
      <!-- 2.van-list包裹列表，组件内源码，检测网页滚动事件，判断滚动位置是否快到达内容高度(触底)
      loading为true->底部加载中文字出现->内部加载中文字出现->内部认为现在处于加载中状态 -->

      <!-- 3.immediate-check让list组件不要上来就检查是否触底 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多评论了，请发表评论"
        @load="onLoad"
        :immediate-check="false"
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
      </van-list>
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
        <van-icon
          name="star-o"
          color="red"
          size="0.53333334rem"
          @click="articleCollectFn(true, artObj)"
          v-if="artObj.is_collected === true"
        />
        <van-icon
          name="star-o"
          size="0.53333334rem"
          v-else
          @click="articleCollectFn(false, artObj)"
        />
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
        @blur="blurFn"
        v-model.trim="comText"
      ></textarea>
      <van-button
        type="default"
        :disabled="comText.length === 0"
        @click="sendFn"
        >发布</van-button
      >
    </div>
    <!-- /发表评论-区域2 -->
  </div>
</template>

<script>
import {
  commentsListAPI,
  commentLikingAPI,
  commentDisLikingAPI,
  commentSendAPI,
  articleCollectionAPI,
  articleDisCollectionAPI
} from '@/api'
import { timeAgo } from '@/utils/date.js'

export default {
  name: '',
  components: {},
  props: {
    artObj: {
      type: Object
    } // 文章对象
  },
  data() {
    return {
      offset: null, // 偏移量评论ID
      commentArr: [], // 评论列表
      totalCount: 0, // 评论总数量(后台返回)
      isShowCmtBox: true, // 默认显示第一套评论容器
      comText: '', // 发布评论的内容
      loading: false,
      finished: false,
      lastId: null // 最后一条评论的id用作分页
    }
  },
  async created() {
    const res = await commentsListAPI({
      id: this.$route.query.art_id // 文章id
    })
    this.commentArr = res.data.data.results // 评论数据
    this.totalCount = res.data.data.total_count // 评论总数
    this.lastId = res.data.data.last_id

    // 网页打开->没有评论，res是空数组,让list组件直接显示没有更多评论的底部文字
    if (res.data.data.results.length === 0) {
      this.finished = true
    }
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
    },

    // 发布评论按钮的点击事件
    async sendFn() {
      // 前端效果：把评论加入到列表里
      const res = await commentSendAPI({
        id: this.$route.query.art_id,
        content: this.comText
      })
      this.commentArr.unshift(res.data.data.new_obj)
      this.totalCount++ // 发布评论，计数自增
      this.comText = '' // 清空输入框
      this.commentClickFn() // 让第一条评论滚到到屏幕上
    },

    // 评论输入框-失去焦点
    blurFn() {
      // 问题：点击发布按钮，发现点击事件不执行-排除代码问题
      // 原因：评论区域2在页面点击发布一瞬间，输入框失去了焦点，
      // 被v-if和v-else移除了整个标签导致点击事件没来得及执行
      // 解决：失去焦点时，变量值最后再执行改变
      setTimeout(() => {
        this.isShowCmtBox = true
      })
    },

    // 底部加载更多
    async onLoad() {
      // 这里判断和immediate-check任选一个，所以这里可以不写，但是immediate-check
      // 是内部不进行判断，监听滚动的事件还在，第一个频道滚到到底再切换第二个频道的时候(新建-内容没有那么高)，
      // 滚动会从底部滚动回顶部，这时滚动事件触发了，immediate-check判断会无效
      // 如果想要万无一失，这里判断还是加上，双重保险
      if (this.commentArr.length > 0) {
        // 请求下一页数据
        const res = await commentsListAPI({
          id: this.$route.query.art_id, // 文章id
          offset: this.lastId
        })
        this.commentArr = [...this.commentArr, ...res.data.data.results] // 评论数据
        this.totalCount = res.data.data.total_count // 评论总数
        this.lastId = res.data.data.last_id

        if (res.data.data.last_id === null) {
          // 没有下一页
          this.finished = true
        }
        this.loading = false
      } else {
        this.loading = false
      }
    },

    // 文章收藏
    async articleCollectFn(bool, artObj) {
      if (bool) {
        // 用户取消收藏
        artObj.is_collected = false
        await articleDisCollectionAPI({
          artId: artObj.art_id
        })
      } else {
        // 用户点赞
        artObj.is_collected = true
        await articleCollectionAPI({
          artId: artObj.art_id
        })
      }
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
