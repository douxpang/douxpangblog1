---
title: 当你买了新的mac
date: 2021-10-10
tags:
 - 经验总结
categories: 
 - 工具
---


大家好，我是doux，之前也没有怎么发布文章，现在写出一些平时的想法希望和大家交流！
<br><br>
虽然之前在两段实习经历里,都是用着macos系统，但是笔者自身的电脑一直是个老旧的暗夜精灵。（话说这个电脑好重，性能也一般，不知道有没有朋友和我感觉一样）这不，前一段时间买了一个新款的mbp，想着以后工作之后应该也会用公司的工作本，这里整理一下mac新机开启后一些常用的配置，希望帮助大家拿到新电脑后都能快速上手开发。

### 下载相关软件

	
   当拿到电脑的时候先是下载了一些常用的软件，vx，qq，音乐软件，firefox，chrome，印象笔记，有道词典这些东西，毕竟是自己的电脑嘛，平时生活中要用的一些软件也是要下的。
   
   这里再推荐一个小工具吧，超级右键，在某些时候还是挺方便的，配置也简单
   
  ### 下载相关开发环境和工具
  
  这里再推荐一个平时自己比起自带终端更常用的终端，iterm2。用起来比较舒服，性能也很不错。
 
  然后是下载了一个比较好用的包管理器homebrew，用它可以比较方便的安装一些包，可能一些同学包括之前刚开始接触的我不是很明白homebrew，觉得下载看上去也比较麻烦，这里推荐一个比较好用的下载脚本，
` /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh) `
  比较方便的就能下载，如果有同学和我一样是m1芯片，上面的脚本会出错，可以用这个脚本替代一下` /bin/zsh -c "$(curl -fsSL https://gitee.com/huwei1024/HomebrewCN/raw/master/Homebrew.sh)  `
  
   因为我是前端嘛，首先就下载了node，随后是git，这两个都是很常用的，就不多说了
   
   补充一下，像之后一些npx，nvm等也是经常会用到的
   
   nvm可以用curl这种指令下，也可以用homebrew下载安装
  
  
  接着就是下载我平时最常用的开发工具vscode，这个我就不赘述下载过程了，而是给大家推荐一些我比较常用的vscode插件，正是因为有这么多好用的插件，vscode才会这么好用呀
  #### vscode插件推荐
  
  1.Chinese language pack for visual studio code
  
  不解释了，这个一般我都会首先下载，习惯英文开发的同学可略过
  
  2.gitlens 
  
  这个也是我觉得很好的插件，特别是在工作之中，可以看到文件的git提交信息并做一些操作
  
  3.debugger for chrome 
  
  下载这个就可以比较方便的自己本地用chrome调试，之后我应该会总结一下关于vscode本地调试的文章
  
  4.open in browser
  
  快速直接用浏览器打开文件，方便
  
  5.prettier
  
  这个应该都知道，我比较习惯用prettier调整格式
  
  6.vetur
  
  很好用的vue支持
  
  7.code spell checker
  
  帮你检查一些拼写规范，很多时候会避免一些bug！
  
  8.bracket pair colorizer
  
  在代码比较杂乱的时候，一些更鲜明的括号关系，能帮助我们更好理清头绪
  
  
  ### 其他帮助
  
  在开发中，一些自带的快捷键也会增加我们的效率，建议看一下官网的[这里](https://support.apple.com/zh-cn/HT201236)
  
  在我用自己的网络用npm下载一些包的时候，可能会因为国外源而使我们的下载速度过慢，这时候我们可以用cnpm去尝试一下 
  安装cnpm的指令：` sudo npm install -g cnpm --registry=https://registry.npm.taobao.org`
  
  在我们刚加入工作中的时候，可能会因为对git陌生出现一些和同事沟通的错误，[这里](https://mp.weixin.qq.com/s/PTSQognhbJjosLDQBcdILw) 再分享一个git相关的教程。
  
  
  大概就先想到这些啦，大家有什么想法随时都可以和我交流，祝大家每天开心😄