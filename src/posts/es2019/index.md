---
title: 『译』ES2019 简明指南
date: 2019-06-18
path: '/es2019'
tldr: ECMAScript 是 JavaScript 的标准，它通常简写为 ES。在本文中让我们一览 ES2019 中新增的功能。
tags: ['JavaScript']
---

ESNext 经常用来表示下一个 JavaScript 版本的名称。

目前 ECMAScript 的版本是发布于 2018 年 6 月份的 **ES2018**。

历史上 JavaScript 版本的标准化是在夏季，所以我们可以期待一下即将在 2019 年夏天发布的 **ECMAScript 2019**。

本文写作时，ES2018 已经发布，而 **ESNext 就是 ES2019**。

针对 ECMAScript 标准的提案被组织为 Stages，Stages 1-3 是新功能的孵化器，一旦该功能到达 Stage 4，那么它最终就会被纳入到新标准。

本文写作时，我们有一些位于 Stage 4 的新功能。我在本文中将介绍这些功能。主流浏览器的最新版本已经实现了这些功能中的绝大部分。

- `Array.prototype.{flat, flatMap}`
- 可选 `catch` 绑定
- `Object.fromEntries()`
- `String.prototype.{trimStart, trimEnd}`
- `Symbol.prototype.description`
- JSON 改进
- 更好的 `JSON.stringify()`
- `Function.prototype.toString()`

其中一些变化主要用于内部使用，但是弄清楚发生了什么变化对我们也非常有帮助。

## `Array.prototype.{flat, flatMap}`

`flat()` 是一个新的数组方法，它可以从一个多维数组创建一个一维数组。

例子：

```javascript
['Dog', ['Sheep', 'Wolf']].flat();
// ['Dog', 'Sheep', 'Wolf']
```

默认情况下，该方法只会扁平化第一层级的数组。但是它也接受一个参数，来设置你想要扁平化数组的层级。如果参数为 `Infinity`，则会扁平化所有层级。

```javascript
['Dog', ['Sheep', ['Wolf']]].flat();
//[ 'Dog', 'Sheep', [ 'Wolf' ] ]

['Dog', ['Sheep', ['Wolf']]].flat(2);
//[ 'Dog', 'Sheep', 'Wolf' ]

['Dog', ['Sheep', ['Wolf']]].flat(Infinity);
//[ 'Dog', 'Sheep', 'Wolf' ]
```

如果你对 JavaScript 数组的 `map()` 方法比较熟悉，正如你所知道的，它可以在数组的每个元素上执行一个函数。

`flatMap()` 是一个数组的新方法，它结合了 `flat()` 和 `map()`。当你想在 `map()` 回调返回的数组上调用一个函数，并且返回一个扁平化的数组时，它非常有用：

```javascript
['My dog', 'is awesome'].map(words => words.split(' '));
// [['My', 'Dog'], ['is', 'awesome']]

['My dog', 'is awesome'].flatMap(words => words.split(' '));
// ['My', 'Dog', 'is', 'awesome']
```

## 可选 catch 绑定

某些情况下我们不需要为 try/catch 的 catch 块绑定一个参数。

过去我们必须这样写：

```javascript
try {
  //...
} catch (e) {
  //处理错误
}
```

如果我们没有必要用 `e` 来分析错误，现在则可以直接省略它：

```javascript
try {
  //...
} catch {
  //处理错误
}
```

## `Object.fromEntries()`

JavaScript 对象在 [ES2017](https://flaviocopes.com/es2017/) 中引入了 `entries()` 方法。

`entries()` 方法会返回一个包含它自身所有属性的数组，像 `[key, value]` 这样的数组。

```javascript
const person = { name: 'Fred', age: 87 };
Object.entries(person);
// [['name', 'Fred'], ['age', '87']]
```

ES2019 引入了 `Object.fromEntries()` 方法，它可以从类似上面的属性数组中创建一个新对象：

```javascript
const person = { name: 'Fred', age: 87 };
const entries = Object.entries(person);
const newPerson = Object.fromEntries(entries);

person !== newPerson; // true
```

## `String.prototype.{trimStart, trimEnd}`

这个功能在 v8/Chrome 中已经接近一年了，然而它在 ES2019 中才会被标准化。

### `trimStart()`

将原始字符串开头的空白符移除，并返回一个新字符串：

```javascript
'Testing'.trimStart(); //'Testing'
' Testing'.trimStart(); //'Testing'
' Testing '.trimStart(); //'Testing '
'Testing'.trimStart(); //'Testing'
```

### `trimEnd()`

将原始字符串尾部的空白符移除，并返回一个新的字符串：

```javascript
'Testing'.trimEnd(); //'Testing'
' Testing'.trimEnd(); //' Testing'
' Testing '.trimEnd(); //' Testing'
'Testing '.trimEnd(); //'Testing'
```

## `Symbol.prototype.description`

你现在可以通过访问其 `description` 属性来检索一个 Symbol 的描述了，而不必使用 `toString()` 方法：

```javascript
const testSymbol = Symbol('Test');
testSymbol.description; // Test
```

## JSON 改进

在此改进之前，解析 [JSON](https://flaviocopes.com/json/) 的字符串中不允许使用换行符（\u2028）和段落分隔符（\u2029）。

在包含它们的字符串中使用 `JSON.parse()` 时，会导致 `SyntaxError`。但是现在它们被定义为 JSON 的标准，也可以正确地解析。

## 更好的 `JSON.stringify()`

修复 `JSON.stringify()` 在处理代理 UTF-8 码点（U+D800 到 U+DFFF）的输出。

在此之前，调用 `JSON.stringify()` 会返回一个异常格式的 Unicode 字符 (a “�”)。

现在，这些代理码点可以使用 `JSON.stringify()` 安全地表示为字符串，并且可以使用 `JSON.parse()` 转换为其原始形式。

## `Function.protoytype.toString()`

函数一直有一个 `toString()` 的实例方法，它返回包含函数代码的字符串。

ES2019 引入的变化是更改其返回值，避免剥离注释或者空白符（例如空格），以便更准确地表示函数的定义。

如果我们有如下代码：

```javascript
function /* this is bar */ bar() {}
```

之前的行为是：

```javascript
bar.toString(); // function bar() {}
```

现在的行为：

```javascript
bar.toString(); //function /* this is bar */ bar() {}
```

> 原文链接：[The ES2019 Guide](https://flaviocopes.com/es2019/)
