---
title: asyncawait异步错误分析以及相关改造
date: 2022-01-25
tags:
 - 异步编程
categories: 
 - 实例
---

## 一、前言

在一次迭代的发版之后，测试同学回归的时候，忽然发现错误。

当通过测试同学提供的线索在监控平台中反复查找之后，一个后端的接口报错出现在我眼中，源头是是由于后端的报错？但是印象中，之前也有过报错，没有眼前看到的这么脆弱啊，我不禁看向了前几天所做的一些逻辑改动，根据分析过后，直接原因是一个逻辑没有执行，而它放在了一个await请求函数之后。 一起查看的同事忽然说，哎？不是有trycatch么，怎么还有问题。我一下想起以前忽视了的一些东西

## 二、原理

在我们的项目之中，绝大部分的异步请求应用的方案为async/await，这是现在广泛应用的先进方案。但是与之而来的有个小问题是，关于async/await的各种异常处理方法不少，但是总体是比较混乱的，不少有经验的同学没有仔细思考的话也会写出不符合规范，不安全的代码。比如项目中有很多处，去捕获错误的主要方式只靠一层try/catch，实际情况下它可能并没有想象中的那么可靠。

下面简单和大家回想一下几种情况

假如我们有一个异步请求函数fetch()

-   同步语法错误（try/catch：有我稳稳地😊）

```
async function fetch() {
    const o = null;
    try {
         o.thisThrow;
    } catch (error) {
        // "TypeError: Cannot read property 'thisThrow' of null"
        console.error(error);
    }
}
```

-   抛出的异步请求 （try/catch: 异步什么的别往我里面塞，不讲武德🙀）

```
async function fetch() {
    try {
        return Promise.reject(new Error("phrbug2"));
    } catch (error) {
        // 代码不会执行到这里
    }
}
```

-   有await的异步请求（try/catch: 有await帮我，又支棱起来了😁)

```
async function fetch() {
    try {
        await Promise.reject(new Error("phrbug1"));
    } catch (error) {
        error.message; // "phrbug1"
    }
}
```

来都来了，虽然觉得大佬们都明白以上几个结果的背后原因，但是我还是在这里总结一下～


首先为什么try/catch可以轻松的包揽住同步的错误，而对异步的一些错误就无能为力了？

这里应该简单说一下try/catch去捕获错误的原理,比如我们在一个函数里，书写了try/catch，那么我们在try模块中去写的逻辑，以及调用的函数，如果出了错误，都会随着函数调用栈找到我们在这里的catch。由此，try/catch无法捕获到相应的异步错误的原因也呼之欲出了，因为那个错误在它的调用栈里并没有办法找到我们去配置的catch

那既然如此，为什么最后一种情况的catch可以捕获到错误呢？

这就是await的功能了，我觉得主要是以下三点

1.  await可以暂停async function的运行，这个“暂停”，在之前红宝书上更具体的说法就是await会暂停执行异步函数后边的代码，让出javascript运行时的执行线程
1.  它可以用同步的写法去获取Promise的执行结果
1.  try/catch 可以获取到await所得到的错误

按照以上的说法，正常如果是异步任务，就是捕获不到的。但是如果用await关键字，它可以获取到之前调用栈的结果，这就是await一个很强大的地方，它可以把一个Promise的reject抛到try/catch的catch之中去。

这时候可能有的同学会一下感觉：哎？既然await这么厉害，那await➕try/catch的组合好像也没什么问题。\
bug:“在我出现的之前，写代码的同学也是这么想的”\
“。。。”

## 三、解决方案


之前的await+try/catch方案主要会遇到的问题就是，当我们await出的是一个异步错误的时候，以之前的catch里的return Promise.reject(). 这个错误就会不断的向外抛出，直到全局，产生*uncaught Error*，这是很难让人接受的事情，并且也会导致函数执行到这里的时候直接抛出，导致之前的一个bug

1.promise的catch错误捕获

这个可以做为一个临时快速的解决方案，如果担心有产生的异步错误，可以在我们的await的操作之后，加上Promise的catch，就可以捕获到相应的promise错误了。但是它的问题就是如果在每次await都要额外追加await的话，未免显得复杂，且不是很优雅

2.  Promise中间处理和请求错误改造

针对之前的实际问题和以上的分析，觉得主要的一些风险来自对Promise.reject()或者throw的错误Promise期约。所以此方案对此进行了处理

首先在之前的函数里，很多请求如果有错误会直接return Promise.reject() ，而如果想要不传出错误的期约，此方案先采用以下函数进行处理

```
export const promiseWrap = function promiseWrap(promise) {
   //  isPromise 为一个自书写的判断是否为isPromise的函数
  if (!isPromise(promise)) {
      return new Promise((resolve, reject) => {
          reject(new Error('参数不是 Promise'));
      }).catch((err) => {
          return [err, null];
      });
  }
  return promise.then(data => {
      return [null, data];
  }).catch(err => {
      return [err, null];
  });
}
```

实际使用例子：

```
const [error,result] = await promiseWrap(request.post({
            。。。
        }))
      if(error) {
        return Promise.resolve([error,null])
      }
      return Promise.resolve([null,result])
```

经过检验之后，此方案可以更加安全放心的去对可能发生的错误发生处理，在过程中和最外层都可以用简单的方法去获取错误信息和请求的数据

## 四、结尾

本文内容结束，希望能有帮助。虽然应用第二种方案之后已经在稳定性和可读性上有所提升，但还是可以继续优化，有想法的大佬可以指点一下～