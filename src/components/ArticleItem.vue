<template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artItem.title }}</span>
          <!-- 单图 -->
          <!-- <img
            class="thumb"
            v-if="artItem.cover.type === 1"
            :src="artItem.cover.images[0]"
            alt=""
          /> -->
          <van-image
            class="thumb"
            v-if="artItem.cover.type === 1"
            :src="artItem.cover.images[0]"
          >
            <template v-slot:error>图片走丢了</template>
          </van-image>
        </div>
        <!-- 多图 -->
        <div class="thumb-box" v-if="artItem.cover.type > 1">
          <!-- <img
            class="thumb"
            v-for="(imgUrl, index) in artItem.cover.images"
            :key="index"
            :src="imgUrl"
            alt=""
          /> -->
          <van-image
            class="thumb"
            v-for="(imgUrl, index) in artItem.cover.images"
            :key="index"
            :src="imgUrl"
          >
            <template v-slot:error>图片走丢了</template>
          </van-image>
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
          <van-icon name="cross" @click="show = true" v-if="isShow" />
        </div>
      </template>
      <!-- /label区域插槽 -->
    </van-cell>
    <!-- /一条文章单元格 -->

    <!-- 关闭按钮×，反馈面板 -->
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="cancelFn"
      @close="closeFn"
      get-container="body"
      :cancel-text="bottomText"
    />
    <!-- /关闭按钮×，反馈面板 -->
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
import { firstActions, secondActions } from '@/api/report.js'

export default {
  name: '',
  components: {},
  props: {
    artItem: Object, // 文章对象
    isShow: {
      type: Boolean,
      default: true // 首页默认需要显示反馈面板
    }
  },
  data() {
    return {
      show: false, // 反馈面板显示与隐藏
      actions: firstActions, // 反馈面板选项数组
      bottomText: '取消' // 反馈面板的底部按钮文字
    }
  },
  created() {},
  methods: {
    formatTime: timeAgo, // 函数体是timeAgo

    // action:反馈的选项内容，item:反馈的选项索引值
    onSelect(action, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      //   this.show = false

      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('disLikeEV', this.artItem.art_id)
        // 无论反馈成功/失败，关闭/隐藏反馈面板
        this.show = false
      } else {
        // 二级反馈选项
        this.$emit('reportEV', this.artItem.art_id, action.value)
        this.show = false
      }
    },

    // 底部按钮的点击事件
    cancelFn() {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },

    // 关闭面板触发事件
    closeFn() {
      this.actions = firstActions
      this.bottomText = '取消'
    }
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
