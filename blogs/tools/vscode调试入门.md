---
title: vscode调试入门
date: 2021-10-10
tags:
 - vscode
categories: 
 - 工具
---

### 前言

记得我还是一个小菜鸡的时候，就有人问过我，都用什么调试，我红着脸说到，我只会用console调试。羞愧的我想再继续掌握一下vscode调试的方法，可惜当时没有找到很好的教程，加上相关基础较差，只能是一知半解。如今进化为大菜鸡的我，总结一下基础的vscode调试


### 基本调试


可以说vscode对js代码的调试非常友好了，它内置了node的debugger插件，如果是要用vscdoe调试python，c++等还是要后续安装插件的

基本的调试方法很简单,写一段简单的代码


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e9cb3f04d345b08833e6deb525b276~tplv-k3u1fbpfcp-watermark.image)

然后在调试项里找到这个小三角箭头



![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60c460b5c596427783b3197841f68f69~tplv-k3u1fbpfcp-watermark.image)


然后就可以进入node的调试界面


![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86d65785e0a84dfb86952600a9fec9cd~tplv-k3u1fbpfcp-watermark.image)




怎么样！是不是很简单就达到了我想要的效果,比单纯一个个console出来要更好


### 深入一下

上边的方法虽然很简单，但是只适用比较简单的情况，对于大多数调试场景，去创建launch配置文件是更好的，因为它允许配置和保存调试设置细节

#### launch.json

当你刚开始创建还没有launch.json的时候  vscoed会自动帮你自动检测你的debug环境，开始debug
但如果失败了，会让你进行选择

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c14759f111e4b859a1b8cb8c48e8a16~tplv-k3u1fbpfcp-watermark.image)

然后他会在你当前工作区下，给你创建个.vscode文件夹，里面有我们要的launch.json文件。简单说我们可以通过这个文件可配置的debug

假如你的launch.json文件是这样的（搞懂意思就好）
```

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      
    }
  ]
}
```
其中

type属性是指你这次debug的类型 我这里介绍常用的两类 node和chrome 下边都会说到

request 指的是请求配置类型，氛围launch和attach

name 指的就是你这一条调试配置的name，会出现在start绿箭头，选择具体方式的时候

这几个是必用的

有更多的会在之后涉及，了解更多可以看这里的[文档](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes)

#### attach还是launch

这是两个核心的debugging模式，用不同方式去处理工作流

简单来说 launch会在 你调试的工具 也就是我们用的vscode 启动另外的应用，这很适合你习惯于用浏览器的方法

attach 意为附加 会在你的开发者工具上附加调试程序

#### chrome debugger

除了用上述的type为node的调试方法，我们也可以用调用的chrome的工作台去调试

这里要安装一个插件 debugger for chrome 我在之前的文章[当你买了新的mac ](https://juejin.cn/post/6935247997525557285#heading-1)曾经提到过

当安装好之后 

你就可以在我们的launch.json里添加配置啦！


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a41686513d8414988cac0258fae6f80~tplv-k3u1fbpfcp-watermark.image)



假如我们添加一个这样的配置

```
{
    "type": "chrome",
    "request": "launch",
    "name": "Launch Chrome",
    "url": "http://localhost:8080",
    "file": "${workspaceFolder}/index.html"
},

```

file 值得就是打开的文件 workspaceFolder是我们当前的工作区

假如我们的index.html是这样的并打上断点


![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7631a443f69e46ddb7e48f842049d308~tplv-k3u1fbpfcp-watermark.image)


可以进入我们的chrome调试页面



![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00bb225cb7344f43b54b97fc697c0c95~tplv-k3u1fbpfcp-watermark.image)



### 总结

基本的调试入门方法就是这样啦，其实还有更深层的内容，我会继续学习，完善这篇文章

如果文章给到你了一点帮助的话 请给我点个赞吧 感谢

#### 参考

https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
https://code.visualstudio.com/docs/nodejs/nodejs-debugging