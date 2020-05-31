---
title: 『TypeScript』如何对 JS 进行类型检查
date: 2019-08-31
path: '/typescript-in-action/check-types-javascript'
tldr: 借助 VSCode 和 TypeScript 对 JS 进行类型检查。
tags: ['TypeScript', 'JavaScript']
cover: './cover.png'
---

JavaScript 是一门动态类型语言，我们在编写代码时，一不注意漏掉一个问题可能会导致生产环境出现大问题，例如忽略某个函数的参数或返回值类型。在越大的工程中，越健壮的代码显得尤为重要，那么如何借助 VSCode 和 TS 写出更加健壮且易读的代码呢？

## 使用 VSCode 和 WebStorm 等

VSCode 和 WebStorm 属于现代编程工具，它们对 JS 的类型提供了更好的支持，比如类型检查和类型推导，在编写代码阶段就可以避免很多不必要的错误。

## JSDoc

JSDoc 其实就是类似于 JavaDoc 的一种注释性文档，借助开发工具可以对 JS 的变量进行类型检查，而且也可以生成 HTML 文档方便阅读。

```js
/**
 * add
 * @param {String} x
 * @param {String} y
 * @returns {String}
 */
function add(x, y) {
  return x + y;
}
```

`@param` 可以指定参数的类型，`@returns` 则可以指定函数的返回值类型。如果使用 VSCode 等工具，在调用时会进行类型检查，如果参数类型不匹配的话，则会出现错误提示。

JSDoc 支持很多 `@` 关键词，可以参考[文档](https://jsdoc.app/)。它甚至可以支持自定义**类型**，但是写法比较繁琐，如果用在大型项目中的话，维护这些注释的话，得不偿失。

## TypeScript 声明文件

TS 声明文件有几种生成方式：

- 在 `tsconfig.json` 中配置 `declaration`
- 安装已有声明文件，例如 `yarn add -D @types/lodash`
- 手动编写声明文件，TS 有提供一些[模板](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html)
