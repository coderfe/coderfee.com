---
title: 如何在 Gatsby.js 中使用 BizCharts？
date: 2019-11-23
path: /gatsby/use-bizcharts-in-gatsby
tldr: BizCharts 踩坑记录：Gatsby.js 在服务端渲染（SSR）模式下使用 BizCharts
tags: ['Gatsby', '可视化']
cover: './cover.png'
---

<a href="https://bizcharts.net/index" target="_blank" rel="noopner noreferrer">BizCharts</a> 是阿里前端团队开源的一款基于 React 开发的数据可视化框架。今天上午想给[博客书单](https://coderfee.com/year)加一个数据统计的功能，便引入了 BizCharts，但在编译的时候出现了 `document not defined` 的错误，这是服务端渲染模式下的典型问题。

## 解决过程

我的博客是基于 Gatsby.js 开发的，所以我想它肯定会做对应的处理，参见<a href="https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules" target="_blank" rel="noopner noreferrer">文档</a>，在 `gatsby-node.js` 中加入以下代码：

```javascript
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /bizcharts/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
```

但奇怪的是问题没有解决。

于是经过几分钟的 Google，终于在 GitHub 上找到了一个 <a href="https://github.com/antvis/g2/issues/296" target="_blank" rel="noopner noreferrer">issue</a>，它的做法是使用环境变量来判断是否处于客户端，如下：

```javascript
let bizcharts;

if (process.browser) {
  bizcharts = require('bizcharts');
}

//...
render() {
  return <bizcharts.Chart />
}
//...

```
