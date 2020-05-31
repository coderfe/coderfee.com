---
title: 如何解决 Gatsby.js 添加 RSS 报错问题？
date: 2019-11-23
path: /gatsby/add-rss-feed
tldr: 解决 Gatsby.js 博客添加 RSS 后可能报错的问题
tags: ['Gatsby', 'RSS']
cover: './cover.png'
---

## 报错

```
error on line 2025 at column 11: PCDATA invalid Char value 8
```

## 原因

并非所有的 utf-8 有效字符都会被 XML 接受，因此在解析的过程中要将某些特殊字符移除。

## 解决方案

把 `gatsby-plugin-feed` 插件的 `serialize` 方法替换为以下方法：

```javascript
// gatsby-config.js
serialize: ({ query: { site, allMarkdownRemark } }) => {
  return allMarkdownRemark.edges.map((edge) => {
    return Object.assign({}, edge.node.frontmatter, {
      description: edge.node.frontmatter.tldr,
      date: edge.node.frontmatter.date,
      url: site.siteMetadata.siteUrl + edge.node.fields.slug,
      guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
      custom_elements: [
        {
          'content:encoded': edge.node.html.replace(
            /[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm,
            ''
          ),
        },
      ],
    });
  });
};
```

其中，真正起作用的是这段正则替换：

```javascript
html.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, '');
```
