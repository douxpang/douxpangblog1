---
title: 你总会遇到的git问题（1）
date: 2021-10-19
tags:
 - git
categories: 
 - 工具
---




最近重新温习了下git，同时在毕设中也遇到过一些git的小问题，这里先总结一部分，以便于自己和大家总结学习


### 1. 新项目准备提交

当你新建了一个项目目录，你打算有所提交的时候

首先你要使自己的项目目录，变为一个支持git的目录，操作指令如下

`git init`

随后，大家应该都基本指导工作区，暂存区这些概念，我们可以用`git status` 查看一下我们当前工作区的状态，我们修改的文件，所在分支等信息。

我们下一步会用 git add 去把我们修改过的文件加入暂存区，往往会用`git add .`添加所有修改文件

下一步一般会是用 `git commit -m '提交信息'` 进行提交

这个时候，因为我们新项目提交，所以我们要设置我们提交的远程仓库

`git remote add origin https:xxx.git` 把我们本地的工程连到远程仓库上


同时，我们可以用 `git remote -v` 查看我们是否设置好了

也可以用 `git remote rm origin`进行删除



### 2.提交时

提交的一般形式是这样的
git push <远程主机名> <本地分支名>:<远程分支名> 

比如 `git push origin master:master` 、 `git push origin phr:phr`


如果 当前已经有一个追踪的远程分支 就用 git push 就可以了


有几个比较常见的错误这里记录一下，我也遇到过

####  Updates were rejected because the remote contains work that you do

这种报错是我们在本地新建库后，与远程仓库的内容不一致导致。所以先pull一下

`git pull origin master `


#### hint: Updates were rejected because the tip of your current branch is behind hint: its remote counte


这个的话其实也是因为 和远程仓库远程版本不一致导致的，可以试一下pull

   但是如果我们pull过之后还是这样报错的话，可以`git push -f origin master` 强行push，要谨慎，确定之后再强制push


#### fatal: refusing to merge unrelated histories


有的时候 我们在pull的时候也会发生这种问题，也是因为我们与远程分支的不同版本

`
git pull origin master --allow-unrelated-histories`

用这样允许不同版本的指令去更新就可以了


### 3.当想反悔

有的时候会遇到这种情况，当我们的工作区混进去一些我们不期望的代码，或者我们对我们操作的一些文件想反悔，可以用如下代码
    
    `git checkout 文件名`
 或者 
    
    `git checkout .` 
    
 舍弃所有修改



有的时候我们会遇到这种情况，当我们pull了远程的代码，或者错误提交之后，我们想回到我们之前的commit状态

这样的话我们可以先看一下我们的提交信息

`git reflog`

然后我们就可以找到之前的提交信息,比如

`git reset --hard 32c1fac`



### 总结


我们平时与git的接触很多，问题也很多，但我们打好基础，一般的问题都可以解决，第一部分先到这啦，大家加油


