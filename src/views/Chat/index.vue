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
          <van-image fit="cover" round :src="$store.state.userPhoto" />
        </div>
        <!-- /右侧是当前用户 -->
      </div>
    </div>
    <!-- /聊天主体区域 -->

    <!-- 对话区域 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="word" placeholder="说点什么">
        <template #button>
          <span style="font-size: 12px; color: #999" @click="sendFn">提交</span>
        </template>
      </van-field>
    </div>
    <!-- /对话区域 -->
  </div>
</template>

<script>
import { io } from 'socket.io-client'
import { getToken } from '@/utils/token.js'

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
        { name: 'me', msg: '我是张三' },
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是张三' },
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是张三' },
        { name: 'xs', msg: 'hi，你好！我是小思' },
        { name: 'me', msg: '我是张三' }
      ],
      socket: null // 客户端和服务器建立链接的socket对象
    }
  },
  created() {
    this.socket = io('http://toutiao.itheima.net', {
      query: {
        token: getToken()
      },
      transports: ['websocket']
    })

    // 测试建立连接
    this.socket.on('connect', () => {
      console.log('建立连接成功')
    })

    // 接收后端传回来的消息
    this.socket.on('message', (obj) => {
      this.list.push({
        name: 'xs',
        msg: obj.msg
      })

      // 最后一条聊天消息滚动到屏幕范围
      // 数据变化，DOM更新是异步的，所以获取的是最后一条div
      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    // 发送点击事件
    sendFn() {
      if (this.word.trim().length === 0) return
      // 用socket链接对象.emit('后端接收消息的事件名', 值)
      this.socket.emit('message', {
        msg: this.word,
        timestamp: Date.now()
      })

      // 把消息显示到页面
      this.list.push({
        msg: this.word,
        name: 'me'
      })

      this.$nextTick(() => {
        const theDiv = document.querySelector('.chat-list>div:last-child')
        theDiv.scrollIntoView({
          behavior: 'smooth'
        })
      })

      // 清空输入框
      this.word = ''
    },
    destroyed() {
      this.socket.close()
      this.socket = null
    }
  }
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
        max-width: 70%;
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
