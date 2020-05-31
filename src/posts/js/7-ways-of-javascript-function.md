---
title: 『译』创建 JavaScript 函数的 7 种方式
date: 2019-01-13
path: '/7-ways-of-javascript-function'
tldr: 认识 JavaScript 一等公民——函数，以及所以关于它的定义或声明方式。
tags: ['JavaScript', '译文']
cover: './cover.png'
---

## 函数

一个可以写一本书的 JavaScript 函数，我想其他人也有这种想法。

但是今天我们长话短说。与其他比较流行的语言（如 Java）相比，函数被认为是 JavaScript 语言中的第一等公民。这意味着你可以将它们作为参数传递，让函数返回一个新函数，甚至将函数作为 JavaScript 语言中的任何其它类型的值。例如，函数可以是 JavaScript 对象中的一个属性（命名方法）。

事实上，函数确实是 JavaScript 中的一等公民，因此使得这门语言非常灵活。例如，你在 JavaScript 中可以使用函数创建*闭包*：

```javascript
function counter() {
  let count = 0;

  function increment() {
    return ++count;
  }

  return increment;
}

const coolClosureCounter = counter();

coolClosureCounter(); // 1
coolClosureCounter(); // 2
```

## 创建函数的 7 中方式

让 JavaScript 新手比较困惑的是函数的声明。在 [MDN][mdn] 里我们可以找到对函数定义的定义：

一个 JavaScript 函数用 function 关键字声明，后面跟着函数名和圆括号 `()`。

在熟悉 JavaScript 之后，该语句仍然有效。但是我要向你展示，在 2018 年以 7 中不同的方式创建 JavaScript 函数。

### 函数声明/定义/语句

```javascript
function foo() {
  console.log('Fun with Functions');
}
```

我想这是我们学的第一种方式，没什么稀奇的。看起来和其它语言很类似。

### 函数表达式

```javascript
const myFunction = function () {
  console.log('Fun with Functions');
};
```

注意，如果你在声明函数表达式之前调用它，那么就会出错：

```javascript
foo(); // Uncaught ReferenceError: foo is undefined

const foo = function () {
  console.log('Hei!');
};
```

### 箭头函数

```javascript
() => console.log('Fun with Functions');
```

在 ES2015（即 ES6） 之后，我们可以使用非常小巧方便的箭头函数表达式。这个语法在链接内置的 `map/filter/reduce` 等方法时特别有用。有点像下面的例子：

```javascript
const names = ['Eirik', 'Nicolai', 'Henrik', 'Jan', 'Paal Kristian', 'Kristine', 'Espen'];

names.filter((name) => name.length > 5).map((name) => name.toLowerCase());
// ["nicolai", "henrik", "paal kristian", "kristine"]
```

但是在使用箭头函数之前，请考虑以下几个事项：

- 函数体内没有特殊的 `arguments` 对象
- 你不能使用 `new (() => {})`
- [箭头函数没有属于自己的 `this`、`arguments`、`super` 或者 `new.target`][arrow-functions]

### 函数的构造函数

好吧，这很尴尬。这种方式不简单也不直观。而且 MDN 不推荐这种方式。但是如果你知道一种用法，我们很乐意了解。

```javascript
const myStrangeFunc = new Function('a', "console.log(a + 'with Functions')");
myStrangeFunc('Fun'); // Fun with Functions
```

函数体是由一个字符串创建的？！有趣的函数呀！还没有结束呢 🤓。

### 其它方式……

- 生成器函数表达式
- 生成器函数声明
- 生成器函数构造函数

生成器函数不是这篇文章的主题。[在这里查看更多信息][generator-functions]。

### IIFE 和匿名函数

函数非常酷，它们也可以是匿名的。在 JavaScript 中，我们允许未命名的函数。你知道可以立即调用它们吗？立即调用函数表达式（IIFE）：

```javascript
(function () {
  // ......
})();
```

[mdn]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions
[arrow-functions]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions
[generator-functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
