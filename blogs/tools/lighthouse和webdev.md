---
title: 你应该了解的lighthouse和web.dev  提高性能必知
date: 2021-10-19
tags:
 - 性能
categories: 
 - 工具
---



### 前言

之前实习的时候，就因为有过要做性能检测小工具的想法，所以当时就通过自己开始了解到了lighthouse，当时这方面的文章还不是很多，自己也是磕磕绊绊，花费很多精力才能继续前进。

这里按自己的想法总结一下，希望能帮到你



### lighthouse是什么，有什么用？

在我们现在越来越注重性能提升的开发时期，一个网站的性能如何，是他最有竞争力的几个指标之一。

所以我们都会想办法，去提升我们网站的性能。但说的简单，我们并不是很清晰容易的就能去找到我们网站具体去欠缺的性能问题并对其做出改进

但是lighthouse可以让我们做到！它可以给我们一个清晰易懂的检测报告，关于我们网站的性能情况

下边是检测了掘金网站的报告


![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37d59ae2d61b468ea42241693b22b11e~tplv-k3u1fbpfcp-watermark.image)

它主要会检测我们几个指标，performance,accessibility,best practices,SEO

其中我们最关注的往往都是我们的性能指标performance

这也是我门在寻求提升性能方法的时候主要去参考的指标


### 如何用lighthouse帮助我们提升性能



![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6f2b9e981314c9a97096cb8b8941026~tplv-k3u1fbpfcp-watermark.image)



这是我门常常关注的几个性能指标，比如FCP首屏时间，现在我们就要从它开始改善我们的性能

#### web.dev

web.dev是谷歌前两年推出的一个提供网站检测服务的网站

它可以和我们的lighthouse联合起来为我们找出性能问题并提供具体的建议

比如这里


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b873cd2f22d4ab69e6e2549634790af~tplv-k3u1fbpfcp-watermark.image)



![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37dc2de4a9cc468f9d1003ffd2844e50~tplv-k3u1fbpfcp-watermark.image)


它建议我们用懒加载方法去处理开屏图片，并为我们提供了切实的教程，可以说是很贴心了（我们可以按照自己切实的项目情况去进行选择采纳和学习）


### 如何用lighthouse

那么如此好用的工具，我们应该如何使用呢

#### 插件使用

上边我的报告就是用，lighthouse的谷歌插件去进行生成的，这里我给大家贴一下插件
地址



```
https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk
```

其实我们chrome Devtools里的performance面板也会有lighthouse的启动位置

所以分别可以再插件使用和devtools里启动

#### 命令行工具使用

上边的报告很方便，但如果我们想要更灵活的去使用lighthouse，还是要用命令行去操作，也是我之前去做的


首先安装全局模块


```js
npm install -g lighthouse
```

安装好了之后你就可以使用它了 

可以先用一下 `lighthouse --help` 

它会给你一些比较详细的帮助，比如我们试一下最简单的`lighthouse [url] --view`

他就会自启动一个chrome进程，并为你生成报告

其中返回的一些数据还会以文件形式存储在你的工作区里


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ff641cf87c74a27aaa5c1ad112a9cd6~tplv-k3u1fbpfcp-watermark.image)



我们可以编程式的用lighthouse的模块去做到很多很棒的事情

比如看这个基础的代码

```
const fs = require('fs');
const lighthouse = require('lighthouse');
// 用来启动chrome
const chromeLauncher = require('chrome-launcher');

(async () => {

   // 无头浏览器。可以不用显式的打开chrome
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  // 这里我们写一些配置 比如输出是html 我们只关注performance指标
  const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
  // 调用lighthouse 传入url和配置
  const runnerResult = await lighthouse('https://example.com', options);


  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);

  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  await chrome.kill();
})();
```

在上边我写了一些注释，一些更多的配置大家可以去官方文档浏览一下

怎么样 是不是很有趣



### 结尾

这里涉及的东西很多，大家可以产生认识之后，再去具体的了解

之后我也会和大家一起学习，也许会推出更多关于performance的介绍和lighthouse这方面的小实战(咕咕

打字不易，如果帮到你了，点个赞吧～ 一切加油

#### 参考

[https://developers.google.com/web/tools/lighthouse?hl=zh-cn](https://developers.google.com/web/tools/lighthouse?hl=zh-cn)


[https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically)