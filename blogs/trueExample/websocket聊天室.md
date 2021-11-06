---
title: vue+websocket最简单配合java实现一对一聊天
date: 2021-10-19
tags:
 - websocket
categories: 
 - 实例
---


### 前言

最近朋友的毕业设计有个需要实现聊天的功能，前端部分需要我帮忙实现，就去简单做了下。虽然之前有了解过用node相关的框架也可以比较方便的实现相关功能，但这次是需要配合他的java后端。所以对websocket进行了复习和前端代码进行了相关设计。

浏览过网上的一些代码，大部分都是功能残缺或对于此次设计臃肿不知所云。然后再回想了websocke相关用法后，做出了很简易的实现，达成了目标，也算是对websocket基本用法进行了掌握

### 实现

页面展示方面进行了一些简单的设计，本来预想是调用一个弹窗当作聊天框，但是为了更简单的配合后端实现，改为跳出一个新的页面

``` 
// 这是跳转方法 在首页和我的私信页面都有相关的按钮跳转到私信功能的页面，会带上去私信用户的id

toChat(id) {
      this.chatId = id
      let _self = this;
      this.$router.push({
        name:'chat',
        params: {
          userId: _self.chatId,
        }
      })
   },
```


这个时候会跳转到主要的聊天的界面chat.vue

```
<template>
  <div class="chat-box">
    <header>与{{userId}}聊天</header>
    <div class="msg-box" ref="msg-box">
      <div
        v-for="(i,index) in list"
        :key="index"
        class="msg"
      >
        <div class="user-head">
          <img :src="i.avatar" height="30" width="30" :title="i.username">
        </div>
        <div class="user-msg">
          <span :style="i.toId == userId?' float: right;':''" >{{i.messageContent}}</span>
        </div>
      </div>
    </div>
    <div class="input-box">
      <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
      <div class="btn" :class="{['btn-active']:contentText}" @click="sendText()">发送</div>
    </div>
  </div>
</template>
```


以上是chat.vue的模版部分 比较简单的布局 上方写着聊天的对象

然后通过浮动和样式的左右可以区分出自己的话和对方的话

下方是聊天框 只要书写一点简单的样式就可以基本完成


```
  export default {
    data() {
      return {
        ws: null,
        list: [], // 聊天记录的数组
        contentText: "", // input输入的值
        userId: 0,   // 对方的id
        myUserId: 0   // 自己的id
      };
    },
    mounted() {
        // 取出路由传来的对方userid
        this.userId = this.$route.params.userId,
        this.initWebSocket();
        // 取出缓存自己的userid
        this.myUserId = localStorage.getItem('user')
    },
    destroyed() {
      this.ws.onclose();
    },
    methods: {
      sendText() {
        let _this = this;
        _this.$refs["sendMsg"].focus();
        let params = {
          toId: _this.userId,  // 对方的id
          messageContent: _this.contentText, // 聊天的内容
          fromId: _this.myUserId,  // 自己的id
        };
        _this.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
        // 把自己发送的消息主动加入到list里
        _this.list.push(params)
        _this.contentText = "";
      },
      // 进入页面创建websocket连接
      initWebSocket() {
        let _this = this;
          let url = `ws://localhost:8081/chat/${_this.userId}`;
          let ws = new WebSocket(url);
          _this.ws = ws;
          ws.onopen = function(e) {
            console.log("服务器连接成功: " + url,e);
          };
          ws.onclose = function(e) {
            console.log("服务器连接关闭: " + url,e);
          };
          ws.onerror = function() {
            console.log("服务器连接出错: " + url);
          };
          ws.onmessage = function(e) {
            //接收服务器返回的数据
            let resData = JSON.parse(e.data)
            _this.list.push(resData)
          };

      },
    }
  };

```


上边是js相关的一些代码，有一点需要的注释就写在代码里了


### 总结

到这里算是把朋友想要的效果完成了

websocket还是很简单好用的！但是不去实践一下可能还是不会完全掌握，之后可以用node写一个全栈的，但是相关资料已经比较清楚了

大家可以去动手试一下  一起加油 如果想要java相关的代码可以联系我