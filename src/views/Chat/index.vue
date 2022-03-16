<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小思同学"
    ></van-nav-bar>
    <!-- /固定导航 -->

    <!-- 聊天主体区域 -->
    <div class="chat-list">
      <div v-for="(obj, index) in list" :key="index">
        <!-- 左侧是机器人小思 -->
        <div class="chat-item left" v-if="obj.name !== 'me'">
          <van-image
            fit="cover"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ obj.msg }}</div>
        </div>
        <!-- /左侧是机器人小思 -->

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao">{{ obj.msg }}</div>
          <van-image
            fit="cover"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <!-- /右侧是当前用户 -->
      </div>
    </div>
    <!-- /聊天主体区域 -->

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="word" placeholder="说点什么">
        <template #button>
          <span style="font-size: 12px; color: #999">提交</span>
        </template>
      </van-field>
    </div>
    <!-- /对话区域 -->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      word: '', // 输入框的内容
      // 所有聊天信息
      list: [
        // 根据name判断消息是左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是张三' }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70px;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}

.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      content: '';
      right: -6px;
      transform: rotate(45deg);
    }
  }
}

.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      content: '';
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}

.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
