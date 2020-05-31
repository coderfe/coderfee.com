---
title: Ajax学习笔记
date: 2016-04-08
path: '/ajax'
tldr: Ajax 即 Asynchronous Javascript and XML（异步的 Javascript 与 XML 技术），简单来说就是无需刷新整个页面就能更新用户界面，从而更快地响应用户行为的一套技术。
tags: ['JavaScript']
cover: './cover.png'
---

## Step1—创建实例化对象

由于各浏览器间的差异，创建实例的方法也不同，下面的代码创建了一个跨浏览器的类实例。

```javascript
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest(); // sarifi/firefox/chrome/IE7+
} else {
  xhr = new ActiveXObject('Microsoft.HTTPXML'); // IE5/6
}
```

如果不考虑 IE5/6，其实只需下面的代码：

```javascript
var xhr = new XMLHttpRequest();
```

## Step2—发送请求

- `open()方法`

  <table><thead><tr><th>参数</th><th>说明</th><th>取值</th></tr></thead><tbody><tr><td>method</td><td>请求类型，参数大写</td><td><code>POST</code>, <code>GET</code></td></tr><tr><td>URL</td><td>请求的URL地址</td><td><code>url</code></td></tr><tr><td>async</td><td>请求是否为异步模式，默认为<code>true</code></td><td><code>true</code>, <code>false</code></td></tr></tbody></table>

- `send()方法`

  <table><thead><tr><th>请求类型</th><th>参数</th></tr></thead><tbody><tr><td><code>POST</code></td><td><code>string</code></td></tr><tr><td><code>GET</code></td><td><code>null</code></td></tr></tbody></table>

## Step3—取得响应

检查请求状态，监听`readyState`和`status`的变化

```javascript
xhr.onreadystatechange = function () {
  if (xhr.readystate === 4) {
    if (xhr.status === 200) {
      // Success do something
    } else {
      // Failed
    }
  }
};
```

`readyState`取值如下

<table><thead><tr><th align="left">readyState</th><th align="left">说明</th></tr></thead><tbody><tr><td align="left">0</td><td align="left">请求未初始化，open方法未调用</td></tr><tr><td align="left">1</td><td align="left">服务器连接已建立，open方法已调用</td></tr><tr><td align="left">2</td><td align="left">请求已接受，收到头信息</td></tr><tr><td align="left">3</td><td align="left">请求处理中，收到响应体</td></tr><tr><td align="left">4</td><td align="left">请求已完成，响应完成</td></tr></tbody></table>

`status`取值如下

<table><thead><tr><th>status</th><th>说明</th></tr></thead><tbody><tr><td>1XX</td><td>信息类，收到请求，表示正在处理</td></tr><tr><td>2XX</td><td>成功，表示用户请求被正确接收处理</td></tr><tr><td>3XX</td><td>重定向，表示请求没有成功</td></tr><tr><td>4XX</td><td>客户端错误</td></tr><tr><td>5XX</td><td>服务器错误</td></tr></tbody></table>

[http 状态码详解](https://help.aliyun.com/knowledge_detail/6555009.html?spm=0.0.0.0.hIQaqR)

## Step4—jQuery 实现 Ajax

jQuery 中提供了一个实现 Ajax 的方法即`jQuery.ajax([settings])`，参数如下：

<table><thead><tr><th>参数</th><th>说明</th></tr></thead><tbody><tr><td>type</td><td>请求类型<code>POST</code> <code>GET</code></td></tr><tr><td>url</td><td>发送请求地址</td></tr><tr><td>data</td><td>一个对象，发送到服务器的数据</td></tr><tr><td>dataType</td><td>预期服务器返回的数据类型，一般采用<code>json</code></td></tr><tr><td>success</td><td>请求成功后的回调函数</td></tr><tr><td>error</td><td>请求失败后的回调函数</td></tr></tbody></table>

示例：

```javascript
$.ajax({
  type: "POST",
  url: <url>
  data: <data>,
  dataType: "josn",
  success: function() {
    // do something
  },
  error: function() {
    // do something
  }
});
```
