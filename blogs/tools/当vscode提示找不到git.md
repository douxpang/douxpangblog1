---
title: 当vscode提示找不到git
date: 2021-10-17
tags:
 - vscode
 - git
categories: 
 - 工具
---


### 发现
在一天照常打开vscode的时候，忽然发现gitlens弹出说不可用，相应的，git也不可用了。

然后在iterm里使用git的报错如下
```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
panghongrui@panghongruideMacBook-Pro ~ % xcode-select --install
xcode-select: note: install requested for command line developer tools

```

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd3238cc227a40549ee90811ec9e2c98~tplv-k3u1fbpfcp-watermark.image)


### 解决


git会忽然出问题，想了下原因应该就是出在昨晚有过一次macos的安全更新

解决方法如下

xcode-select --install

用这条指令可以解决问题，我们发现git可以使用啦～


但是并没有完全解决，我们的gitlens还是不能用啊，这里就要说一个我想更重点说的一个地方，就是vscode的settings.json ，不知道大家以前有没有注意到这里，我再简单说一下，他其实就是对vscode的设置的集合，我们对vscode进行设置，其实是这个json生效，所以那通过什么解决也就明了了。

```
"git.enabled": true,
"git.path": "/usr/bin/git"
```

在这里加上git path就可以了 ，这个path你如果不确定，可以通过which git指令查一下，别忘了重启vscode哦



### 总结

遇到问题及时解决，并对settings.json有一些了解
